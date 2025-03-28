import React, { useState } from "react";
import "../css/noticeAdvertisingModal.css";
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

        <main className="notice-details__main">
          <ul className="notice-details__list">
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 작성자: </strong>
              <div className="notice-details__content">{notice.writer}</div>
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 작성일: </strong>
              <div className="notice-details__content">{notice.date}</div>
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 내용: </strong>
              <div className="notice-details__content">{notice.content}</div>
            </li>
          </ul>
        </main>

        <footer className="notice-details__footer">
          <button className="notice-details__update" onClick={switchUpdateMode}>
            수정
          </button>
        </footer>
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
