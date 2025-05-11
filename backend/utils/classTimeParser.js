function parseClassDaytime(class_daytime) {
  const timeTable = {
    0: ["08:00", "08:45"], 1: ["09:00", "10:15"], 2: ["10:30", "11:45"],
    3: ["12:00", "13:15"], 4: ["13:30", "14:45"], 5: ["15:00", "16:15"],
    6: ["16:30", "17:45"], 7: ["18:00", "18:45"], 8: ["18:50", "19:35"],
    9: ["19:40", "20:25"], 10: ["20:30", "21:15"], 11: ["21:20", "22:05"]
  };

  const dayMap = { "월": "mon", "화": "tue", "수": "wed", "목": "thu", "금": "fri" };
  const result = {}; // 각 요일을 개별적으로 저장할 객체

  if (!class_daytime || typeof class_daytime !== 'string' || class_daytime.trim() === "") {
    return result; // class_daytime이 없으면 그대로 반환
  }

  console.log(`변환 시작: ${class_daytime}`);

  // 정규식을 사용하여 `요일+숫자` 패턴을 찾기 (ex: "월6", "수5", "금3,4") -> ,다음에 숫자인지 글자인지
  const sessions = class_daytime.match(/[월화수목금]\d+(?:,\d+)*/g);

  if (!sessions) {
    console.warn(`유효하지 않은 데이터: ${class_daytime}`);
    return result;
  }

  sessions.forEach(session => {
    const day = session.charAt(0); // 요일 추출 (ex: "월")
    const periodNumbers = session.slice(1).split(",").map(Number).sort(); // 교시 리스트 (ex: ["3", "4"])

    if (!dayMap[day] || periodNumbers.length === 0) {
      console.warn(`잘못된 데이터: ${session}`);
      return; // 데이터 이상하면 무시
    }

    const weekField = `week_${dayMap[day]}`;
    const startField = `${dayMap[day]}_start_time`;
    const endField = `${dayMap[day]}_end_time`;

    const startPeriod = periodNumbers[0];
    const endPeriod = periodNumbers[periodNumbers.length - 1];

    if (timeTable[startPeriod] && timeTable[endPeriod]) {
      result[weekField] = true;
      result[startField] = timeTable[startPeriod][0];  // 요일별 시작 시간 저장
      result[endField] = timeTable[endPeriod][1];  // 요일별 종료 시간 저장

      console.log(`변환 성공: ${weekField}, ${startField} = ${result[startField]}, ${endField} = ${result[endField]}`);
    }
  });

  console.log(`변환 결과: `, result);
  return result;
}

module.exports = parseClassDaytime;
