function parseClassDaytime(class_daytime) {
    const timeTable = {
      0: ["08:00", "08:45"], 1: ["09:00", "10:15"], 2: ["10:30", "11:45"],
      3: ["12:00", "13:15"], 4: ["13:30", "14:45"], 5: ["15:00", "16:15"],
      6: ["16:30", "17:45"], 7: ["18:00", "18:45"], 8: ["18:50", "19:35"],
      9: ["19:40", "20:25"], 10: ["20:30", "21:15"], 11: ["21:20", "22:05"]
    };
  
    const dayMap = { "월": "mon", "화": "tue", "수": "wed", "목": "thu", "금": "fri" };
    const result = {}; // 불필요한 필드는 저장하지 않음
  
    if (!class_daytime || typeof class_daytime !== 'string' || class_daytime.trim() === "") {
      return result; // class_daytime이 없으면 빈 객체 반환
    }
  
    const sessions = class_daytime.split(", ");
    let processedDays = {}; // 요일별로 `start_time`, `end_time`을 개별 저장
  
    for (const session of sessions) {
      const day = session.charAt(0);
      const periodNumbers = session.slice(1).split(",").map(Number).sort();
  
      if (!dayMap[day] || periodNumbers.length === 0) {
        continue; // 잘못된 데이터 건너뛰기
      }
  
      const weekField = `week_${dayMap[day]}`;
      const startField = `${dayMap[day]}_start_time`;
      const endField = `${dayMap[day]}_end_time`;
  
      const startPeriod = periodNumbers[0];
      const endPeriod = periodNumbers[periodNumbers.length - 1];
  
      if (timeTable[startPeriod] && timeTable[endPeriod]) {
        result[weekField] = true;
  
        // 요일별 `start_time`이 이미 있으면 유지 (가장 빠른 시간)
        if (!processedDays[startField]) {
          result[startField] = timeTable[startPeriod][0];
          processedDays[startField] = true;
        }
  
        // 요일별 `end_time`은 마지막으로 저장된 값으로 덮어쓰기
        result[endField] = timeTable[endPeriod][1];
      }
    }
  
    return result;
  }
  
  module.exports = parseClassDaytime;
  