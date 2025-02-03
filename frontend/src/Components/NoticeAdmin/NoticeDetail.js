import React from "react";
import "./css/noticeAdvertisingModal.css";

const DetailModal = ({ notice, onClose }) => {
  console.log(notice);
  if (!notice) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h1 className="notice-details__title">{notice.title}</h1>
        <div className="notice-details__main">
          <ul className="notice-details__list">
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 작성자: </strong>
              {notice.writer}
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 작성일: </strong>
              {notice.date}
            </li>
            <li className="notice-details__item">
              <strong className="notice-details__label">▪️ 본문: </strong>
              {notice.content}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
