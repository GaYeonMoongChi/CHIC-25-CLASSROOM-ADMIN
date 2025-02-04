import React, { useState } from "react";
import "./css/noticeAdvertisingModal.css";
import AdvertisingUpdate from "./AdvertisingUpdate";

const DetailModal = ({ advertising, onClose }) => {
  // 수정 모달 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!advertising) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h1 className="advertising-details__title">{advertising.title}</h1>
        <main className="advertising-details__main">
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
              <strong className="advertising-details__label">▪️ 내용: </strong>
              {advertising.content}
            </li>
          </ul>
        </main>

        <footer className="advertising-details__footer">
          <button
            className="advertising-details__update"
            onClick={switchUpdateMode}
          >
            수정
          </button>
        </footer>
      </div>
      {/* 수정 모달 */}
      {isUpdateMode && (
        <AdvertisingUpdate
          advertising={advertising}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
        />
      )}
    </div>
  );
};

export default DetailModal;
