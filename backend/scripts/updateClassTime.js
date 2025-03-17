const mongoose = require('mongoose');
const dotenv = require('dotenv');
const parseClassDaytime = require('../utils/classTimeParser'); // ✅ 변환 함수 불러오기
const Class = require('../db/class'); // ✅ 기존 Class 모델 불러오기

dotenv.config();

// ✅ 기존 데이터 업데이트 실행
const updateClassTimes = async () => {
  try {
    console.log('🔹 MongoDB에서 모든 강의 데이터를 불러오는 중...');
    const classes = await Class.find(); // 모든 강의 조회
    console.log(`📢 총 ${classes.length}개의 데이터를 업데이트합니다.`);

    let updatePromises = classes.map(async (classData) => {
      if (!classData.class_daytime) return;

      // ✅ class_daytime 변환 적용
      const updatedFields = parseClassDaytime(classData.class_daytime);
      console.log(`🔹 업데이트 데이터: `, updatedFields); // 변환된 값 확인

      if (Object.keys(updatedFields).length === 0) {
        console.warn(`⚠️ 업데이트할 데이터 없음: ${classData.class_daytime}`);
        return;
      }

      // ✅ 불필요한 필드 제거
      const unsetFields = {};
      const allFields = ["week_mon", "mon_start_time", "mon_end_time",
                         "week_tue", "tue_start_time", "tue_end_time",
                         "week_wed", "wed_start_time", "wed_end_time",
                         "week_thu", "thu_start_time", "thu_end_time",
                         "week_fri", "fri_start_time", "fri_end_time"];
      
      allFields.forEach(field => {
        if (!(field in updatedFields)) unsetFields[field] = "";
      });

      console.log(`✅ MongoDB 업데이트 실행:`, { $set: updatedFields, $unset: unsetFields });

      await Class.updateOne({ _id: classData._id }, { $set: updatedFields, $unset: unsetFields });
    });

    await Promise.all(updatePromises); // 병렬 처리
    console.log('✅ 모든 강의 데이터 업데이트 완료');
    process.exit(0);
  } catch (error) {
    console.error('❌ 데이터 업데이트 실패:', error);
    process.exit(1);
  }
};

// 실행
updateClassTimes();
