const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },   // 관리자 이름
  email: { type: String, required: true, unique: true }, // 관리자 이메일 (중복 방지)
  pw: { type: String, required: true },   // 관리자 비밀번호 (bcrypt 암호화)
  type: { 
    type: String, 
    required: true, 
    enum: ['class_admin', 'ad_admin'] 
  }
}, { versionKey: false });

// 비밀번호 저장 전에 암호화 (pre-save hook)
managerSchema.pre('save', async function (next) {
  if (!this.isModified('pw')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.pw = await bcrypt.hash(this.pw, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// `global.managerDB`가 정상적으로 설정되었는지 확인 후 모델 생성
let Manager;
if (global.managerDB) {
  Manager = global.managerDB.model('Manager', managerSchema, 'admin_info');
} else {
  console.error("managerDB가 초기화되지 않았습니다. MongoDB 연결을 확인하세요.");
  Manager = mongoose.model('Manager', managerSchema, 'admin_info'); 
}

module.exports = Manager;
