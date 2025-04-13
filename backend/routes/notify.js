// // 폐기 예정(사용 x)

// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const router = express.Router();

// // 학교 공지사항 크롤링 하는 부분
// // 크롤링할 학교 홈페이지 공지사항 URL
// const NOTICE_URL = 'https://www.kw.ac.kr/ko/life/notice.jsp';

// // 공지사항을 가져오는 함수
// async function fetchNotices() {
//     try {
//         // 홈페이지에서 HTML 가져오기
//         const { data } = await axios.get(NOTICE_URL);
//         const $ = cheerio.load(data);

//         let notices = [];

//         // 공지사항 목록 파싱
//         $('.board-text').each((index, element) => {
//             let titleElement = $(element).find('a');
//             let title = titleElement.text().trim();

//             // '신규게시글' 문자열이 포함된 경우 앞부분만 추출
//             const unwantedText = '신규게시글';
//             const unwantedIndex = title.indexOf(unwantedText);
//             if (unwantedIndex !== -1) {
//                 title = title.substring(0, unwantedIndex).trim();
//             }

//             let link = titleElement.attr('href');
//             let dateText = $(element).siblings('.board-date').text().trim();

//             // 작성일과 수정일을 정규식으로 추출
//             let dateMatches = dateText.match(/\d{4}-\d{2}-\d{2}/g) || [];

//             let date = dateMatches.length > 0 ? dateMatches[0] : ''; // 첫 번째 날짜 = 작성일
//             let update_date = dateMatches.length > 1 ? dateMatches[1] : ''; // 두 번째 날짜 = 수정일

//             // 작성일이 없는 경우, 본문에서 날짜 추출
//             if (!date) {
//                 const dateMatch = $(element).text().match(/\d{4}-\d{2}-\d{2}/g);
//                 if (dateMatch) {
//                     date = dateMatch[0]; // 첫 번째 날짜를 작성일로 설정
//                     update_date = dateMatch.length > 1 ? dateMatch[1] : ''; // 두 번째 날짜를 수정일로 설정
//                 }
//             }

//             // 불필요한 개행 및 공백 제거
//             title = title.replace(/\s+/g, ' ');

//             // 상대 경로를 절대 경로로 변환
//             if (link && !link.startsWith('http')) {
//                 link = `https://www.kw.ac.kr${link}`;
//             }

//             // 유효한 제목, 링크, 날짜가 있는 경우 공지사항 배열에 추가
//             if (title && link && date) {
//                 notices.push({ title, date, update_date, url: link });
//             }
//         });

//         // 공지사항이 없는 경우 경고 출력
//         if (notices.length === 0) {
//             console.warn('크롤링된 공지사항이 없습니다. HTML 구조 변경을 확인해주세요.');
//             console.warn('HTML 데이터 일부:', $.html().slice(0, 500)); // HTML 일부 출력
//         }

//         return notices;
//     } catch (error) {
//         console.error('공지사항 크롤링 실패:', error.message);
//         return [];
//     }
// }

// // API 엔드포인트 (실시간 공지사항 제공) -> 5s 마다 업데이트
// // Get -> http://localhost:8000/api/notify/notices
// // http://localhost:8000/api/notify/notices -> 페이지에서도 확인 가능
// router.get('/notices', async (req, res) => {
//     const notices = await fetchNotices();
//     res.json({ notices });
// });

// module.exports = {
//     router,
//     fetchNotices
// };