import React, { useState } from "react";
import "./css/noticeRow.css";
import NoticeDetail from "./NoticeDetail";

const NoticeRow = ({ notice, onUpdate }) => {
  // 상세보기 모달 상태 관리
  const [showDetail, setShowDetail] = useState(false);

  // Row 클릭하면 모달창 열림
  const handleClick = () => {
    setShowDetail((prev) => !prev);
  };

  return (
    <div className="notice-page__row_div" onClick={() => handleClick(true)}>
      <table className="notice-page__table">
        <tbody>
          <tr className="notice-page__row">
            <td className="notice-page__table-cell" colSpan="2">
              {notice.title}
            </td>
          </tr>
          <tr className="notice-page__row">
            <td className="notice-page__table-date">
              <span className="notice-page__label">등록일: </span>
              {notice.created_at}
            </td>
          </tr>
        </tbody>
      </table>

      {showDetail && (
        <div className="notice-detail-container">
          <NoticeDetail
            notice={notice}
            onClose={() => setShowDetail(false)}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeRow;
