import React, { useState } from "react";
import "./css/noticeModal.css";
import NoticeUpdate from "./NoticeUpdate";

const DetailModal = ({ notice, onClose, onUpdate }) => {
  // 수정 모달 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!notice) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-details__title">{notice.title}</h1>
        </header>

        {/* 공지글 본문 */}
        <main className="notice-details__main">
          <ul className="notice-details__list">
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 작성일: </strong>
              <div className="notice-details__content">{notice.date}</div>
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 수정일: </strong>
              <div className="notice-details__content">
                {notice.update_date}
              </div>
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 내용: </strong>
              <div className="notice-details__content">{notice.content}</div>
            </li>
          </ul>

          {/* 수정 버튼 */}
          <button className="notice-details__update" onClick={switchUpdateMode}>
            수정
          </button>
        </main>
      </div>

      {/* 수정 모달 */}
      {isUpdateMode && (
        <NoticeUpdate
          notice={notice}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default DetailModal;
