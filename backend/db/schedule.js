const mongoose = require('mongoose');

// schedule 스키마 정의
const scheduleSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100,
    validate: {
      validator: v => /^\d{4}$/.test(v.toString()),
      message: props => `${props.value} is not a valid 4-digit year!`
    }
  },
  semester: {
    type: String,
    required: true,
    trim: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  }
}, { collection: 'schedule', versionKey: false });

// class DB 연결된 mongoose 인스턴스에서 모델 생성
const Schedule = global.classDB.model('Schedule', scheduleSchema);

module.exports = Schedule;
