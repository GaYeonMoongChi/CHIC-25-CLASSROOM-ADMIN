// 실행 예시: node scripts/updateClassroom.js 2025-1

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI_CLASS;
// const dbName = 'class';

// 학기 인자 확인
const semester = process.argv[2];
const isStandardFormat = /^\d{4}-\d$/.test(semester);
const isSeasonFormat = /^\d{4}-[\u3131-\uD79D]{2}$/.test(semester); // 한글 2자

if (!semester || (!isStandardFormat && !isSeasonFormat)) {
  console.error('학기 형식이 올바르지 않습니다. 예: 2025-1 또는 2025-여름');
  process.exit(1);
}

const buildingMap = {
  '비': '비마관',
  '한울': '한울관',
  '연': '연구관',
  '새빛': '새빛관',
  '기': '기념관',
  '참': '참빛관',
  '옥': '옥의관',
  '누': '누리관',
  '한천': '한천재',
  '화': '화도관'
};

function parseClassroom(classroom_idx) {
  if (!classroom_idx || typeof classroom_idx !== 'string') return null;

  const match = classroom_idx.match(/^([가-힣]+)(.*)$/);
  if (!match) return null;

  const [, prefix, rest] = match;
  const building = buildingMap[prefix] || prefix;
  const room = rest ? `${rest}호` : null;

  return { building, room };
}

async function updateClassroomInfo() {
  try {
    const conn = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`[${semester}] 컬렉션 업데이트 시작`);

    const Model = conn.model(semester, new mongoose.Schema({}, { strict: false }), semester);
    const classes = await Model.find();

    for (const cls of classes) {
      if (!cls.classroom_idx) continue;

      const parsed = parseClassroom(cls.classroom_idx);
      if (!parsed) continue;

      await Model.updateOne(
        { _id: cls._id },
        {
          $set: {
            building: parsed.building,
            room: parsed.room
          }
        }
      );

      console.log(` ${cls.classroom_idx} → building: ${parsed.building}, room: ${parsed.room}`);
    }

    console.log('모든 강의실 정보 업데이트 완료');
    process.exit(0);
  } catch (err) {
    console.error('업데이트 실패:', err);
    process.exit(1);
  }
}

updateClassroomInfo();
