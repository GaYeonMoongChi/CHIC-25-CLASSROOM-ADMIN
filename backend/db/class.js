const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// MongoDB 연결
const classDB = mongoose.createConnection(process.env.MONGO_URI_CLASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

classDB.on('connected', () => console.log('MongoDB (class) 연결 완료'));
classDB.on('error', err => console.error('MongoDB (class) 연결 실패:', err));

// 스키마 정의
const classSchema = new mongoose.Schema({
  class_idx: { type: String, required: true, unique: true },
  classroom_idx: { type: String, default: "" },
  class_name: { type: String, default: "" },
  prof_name: { type: String, default: "" },
  class_credit: { type: String, default: "" },
  class_daytime: { type: String, default: "" },

  week_mon: { type: Boolean, default: false },
  mon_start_time: { type: String, default: "" },
  mon_end_time: { type: String, default: "" },

  week_tue: { type: Boolean, default: false },
  tue_start_time: { type: String, default: "" },
  tue_end_time: { type: String, default: "" },

  week_wed: { type: Boolean, default: false },
  wed_start_time: { type: String, default: "" },
  wed_end_time: { type: String, default: "" },

  week_thu: { type: Boolean, default: false },
  thu_start_time: { type: String, default: "" },
  thu_end_time: { type: String, default: "" },

  week_fri: { type: Boolean, default: false },
  fri_start_time: { type: String, default: "" },
  fri_end_time: { type: String, default: "" }
}, { versionKey: false });

// 동적으로 collection 이름 받는 함수
function getClassModel(collectionName) {
  return classDB.model(collectionName, classSchema, collectionName);
}

module.exports = { getClassModel, classDB };
