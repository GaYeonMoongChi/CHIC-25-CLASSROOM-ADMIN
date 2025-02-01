import React from "react";
import "./css/noticeModal.css";

const NoticeCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="notice-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-create__h1">
            <input
              type="text"
              className="notice-create__title"
              placeholder="공지 제목을 입력하세요."
            ></input>
          </h1>
        </header>

        <div className="notice-create__main">
          <ul className="notice-create__list">
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 내용: </strong>
              <input
                type="text"
                className="notice-create__input"
                placeholder="공지 내용을 입력하세요."
              ></input>
            </li>
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 이미지 등록: </strong>
              <input
                className="notice-create__input"
                placeholder="이미지 파일을 업로드 해주세요."
              ></input>
            </li>
          </ul>
        </div>

        <footer className="notice-create__footer">
          <button className="notice-create__submit" onClick={onClose}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeCreate;
