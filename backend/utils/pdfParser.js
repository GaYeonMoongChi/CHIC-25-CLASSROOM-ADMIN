// 강의 계획서에서 학정번호만 추출해서 저장

// class_idx만 추출해서 저장하는 함수
const mongoose = require('mongoose');

// 학정번호 형식 검사 (영문 포함)
const isValidClassIdx = (text) => /^[A-Z0-9]{4}-\d-\d{4}-\d{2}$/i.test(text);

async function parseAndSaveClassIdxFromPDF(text, semester) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // 동적 모델 생성
  const dynamicModel = global.classDB.model(
    semester,
    new mongoose.Schema({ class_idx: String }, { versionKey: false }),
    semester
  );

  const seenClassIdx = new Set();

  for (const line of lines) {
    const tokens = line.trim().split(/\s+/);
    if (tokens.length > 0) {
      const class_idx = tokens[0];

      // 유효한 형식이고, 중복이 아닐 경우에만 저장
      if (isValidClassIdx(class_idx) && !seenClassIdx.has(class_idx)) {
        await dynamicModel.updateOne(
          { class_idx },
          { $set: { class_idx } },
          { upsert: true }
        );
        seenClassIdx.add(class_idx); // 중복 방지를 위해 추가
        console.log(`저장됨: ${class_idx}`);
      }
    }
  }

  console.log(`🎓 ${semester} 학기 class_idx 저장 완료`);
}

// 내보내기
module.exports = { parseAndSaveClassIdxFromPDF };
