const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded; // 사용자 정보 저장
    next();
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
  }
};
