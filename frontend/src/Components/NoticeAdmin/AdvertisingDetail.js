import React from "react";
import "./css/noticeAdvertisingModal.css";

const DetailModal = ({ advertising, onClose }) => {
  console.log(advertising);
  if (!advertising) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h1 className="advertising-details__title">{advertising.title}</h1>
        <div className="advertising-details__main">
          <ul className="advertising-details__list">
            <li className="advertising-details__item">
              <strong className="advertising-details__label">
                ▪️ 작성자:{" "}
              </strong>
              {advertising.writer}
            </li>
            <li className="advertising-details__item">
              <strong className="advertising-details__label">
                ▪️ 작성일:{" "}
              </strong>
              {advertising.date}
            </li>
            <li className="advertising-details__item">
              <strong className="advertising-details__label">▪️ 본문: </strong>
              {advertising.content}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
