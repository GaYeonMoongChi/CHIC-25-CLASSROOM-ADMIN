import React from "react";
import "./css/noticeDetail.css";

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
            <li className="notice-details__item">▪️ 작성자: {notice.writer}</li>
            <li className="notice-details__item">▪️ 작성일: {notice.date}</li>
            <li className="notice-details__item">▪️ 본문: {notice.content}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
