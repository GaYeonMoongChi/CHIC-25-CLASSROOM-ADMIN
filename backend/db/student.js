const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,   // 무조건 학번 10자리리
    maxlength: 10
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^010-\d{4}-\d{4}$/ // 010-0000-0000 형식 검증
  }
}, { versionKey: false });

module.exports = mongoose.model('Student', studentSchema, 'ic'); // 'ic' 컬렉션 사용
