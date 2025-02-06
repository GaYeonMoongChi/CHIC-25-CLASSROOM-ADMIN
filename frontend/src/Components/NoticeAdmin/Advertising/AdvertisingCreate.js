import React from "react";
import "../css/noticeAdvertisingModal.css";

const AdvertisingCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="advertising-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="advertising-create__title">홍보/광고글 생성</h1>
          <strong className="advertising-create__label">▪️ 제목: </strong>
          <input
            type="text"
            className="advertising-create__title-input"
            placeholder="홍보글 제목을 입력하세요."
          ></input>
        </header>

        <main className="advertising-create__main">
          <ul className="advertising-create__list">
            <li className="advertising-create__item">
              <strong className="advertising-create__label">▪️ 작성자: </strong>
              <input
                type="text"
                className="advertising-create__input"
                placeholder="작성자명을 입력하세요."
              ></input>
            </li>
            <li className="advertising-create__item">
              <strong
                type="text"
                className="advertising-create__input"
                placeholder="작성일을 등록하세요."
              >
                ▪️ 적용시작일:
              </strong>
              <input
                type="date"
                className="advertising-create__date-input"
                placeholder="적용시작일을 입력해주세요."
              />
            </li>
            <li className="advertising-create__item">
              <strong
                type="text"
                className="advertising-create__input"
                placeholder="작성종료을 등록하세요."
              >
                ▪️ 적용종료일:
              </strong>
              <input
                type="date"
                className="advertising-create__date-input"
                placeholder="적용종료일을 입력해주세요."
              />
            </li>
            <li className="advertising-create__item">
              <strong className="advertising-create__label">▪️ 내용: </strong>
              <textarea
                type="text"
                className="advertising-create__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="advertising-create__footer">
          <button className="advertising-create__submit" onClick={onClose}>
            완료
          </button>
          <button className="advertising-create__cancel" onClick={onClose}>
            취소
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AdvertisingCreate;
