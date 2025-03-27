import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/noticeRow.css";

const NoticeRow = ({ notice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notice.url) {
      alert("해당 게시글의 URL이 존재하지 않습니다.");
      return;
    }

    try {
      const url = new URL(notice.url); // URL 객체를 생성하여 유효성 검사

      if (url.origin === window.location.origin) {
        navigate(url.pathname); // 동일 도메인인 경우 React Router를 사용
      } else {
        window.location.href = notice.url; // 외부 URL인 경우 새 페이지로 이동
      }
    } catch (error) {
      alert("해당 게시글의 URL 데이터를 받아올 수 없습니다.");
    }
  };

  return (
    <div className="notice-page__row_div" onClick={handleClick}>
      <tr className="notice-page__row">
        <td className="notice-page__table-cell">{notice.date}</td>
        <td className="notice-page__divider"></td>
        <td className="notice-page__table-cell">{notice.title}</td>
      </tr>
    </div>
  );
};

export default NoticeRow;
