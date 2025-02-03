import React from "react";
import "./css/noticeAdvertisingModal.css";

const NoticeCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="notice-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-create__h1">공지글 등록</h1>
          <strong className="notice-create__label">▪️ 제목: </strong>
          <input
            type="text"
            className="notice-create__title"
            placeholder="공지 제목을 입력하세요."
          ></input>
        </header>

        <main className="notice-create__main">
          <ul className="notice-create__list">
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 내용: </strong>
              <textarea
                type="text"
                className="notice-create__textarea"
                placeholder="공지 내용을 입력하세요."
              ></textarea>
            </li>
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 이미지 등록: </strong>
              <input
                type="file"
                className="notice-create__input"
                placeholder="이미지 파일을 업로드 해주세요."
              ></input>
            </li>
          </ul>
        </main>

        <footer className="notice-create__footer">
          <button className="notice-create__cancel" onClick={onClose}>
            취소
          </button>
          <button className="notice-create__submit" onClick={onClose}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeCreate;
