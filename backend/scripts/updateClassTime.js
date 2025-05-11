// node backend/scripts/updateClassTime.js 2025-1    # 스크립트 실행(맨 마지막에 어떤 collection_name을 할 것인지 지정해야함)
// 실행시 db에 있는 금5,6 -> start_time과 end_time 분류(해당 기능은 classTimeParser.js에 위치)

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const parseClassDaytime = require('../utils/classTimeParser'); // 변환 함수 불러오기
const { getClassModel } = require('../db/class');

dotenv.config();

// 인자로 학기명 받기
const semester = process.argv[2];
const isStandardFormat = /^\d{4}-\d$/.test(semester);
const isSeasonFormat = /^\d{4}-[\u3131-\uD79D]{2}$/.test(semester); // 한글 2자

if (!semester || (!isStandardFormat && !isSeasonFormat)) {
  console.error('학기 형식 오류: 예) 2025-1 또는 2025-여름');
  process.exit(1);
}

const Class = getClassModel(semester);

// 기존 데이터 업데이트 실행
const updateClassTimes = async () => {
  try {
    const classes = await Class.find();
    console.log(`${semester} 학기 ${classes.length}개 강의 시간 업데이트 시작...`);

    const updatePromises = classes.map(async (classData) => {
      if (!classData.class_daytime) return;

      const updatedFields = parseClassDaytime(classData.class_daytime);
      const unsetFields = {};
      const allFields = ["week_mon", "mon_start_time", "mon_end_time",
                         "week_tue", "tue_start_time", "tue_end_time",
                         "week_wed", "wed_start_time", "wed_end_time",
                         "week_thu", "thu_start_time", "thu_end_time",
                         "week_fri", "fri_start_time", "fri_end_time"];
      allFields.forEach(field => {
        if (!(field in updatedFields)) unsetFields[field] = "";
      });

      await Class.updateOne(
        { _id: classData._id },
        { $set: updatedFields, $unset: unsetFields }
      );
    });

    await Promise.all(updatePromises);
    console.log(`${semester} 업데이트 완료`);
    process.exit(0);
  } catch (error) {
    console.error('업데이트 실패:', error);
    process.exit(1);
  }
};

updateClassTimes();
