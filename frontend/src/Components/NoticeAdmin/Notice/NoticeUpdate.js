import React, { useState } from "react";
import "../css/noticeAdvertisingModal.css";

const NoticeUpdate = ({ notice, submit, onClose }) => {
  // 수정할 값들의 상태
  const [title, setTitle] = useState(notice.title);
  const [writer, setWrite] = useState(notice.writer);
  const [date, setDate] = useState(notice.date);
  const [content, setContent] = useState(notice.explanation);

  if (!notice) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="notice-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-update__title">공지글 수정</h1>
        </header>

        <main className="notice-update__main">
          <ul className="notice-update__list">
            <li className="notice-update__item">
              <strong className="notice-update__label">▪️ 글 제목: </strong>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="notice-update__input"
              />
            </li>
            <li className="notice-update__item">
              <strong className="notice-update__label">▪️ 작성자: </strong>
              <input
                type="text"
                value={writer}
                onChange={(e) => setWrite(e.target.value)}
                className="notice-update__input"
              />
            </li>
            <li className="notice-update__item">
              <strong className="notice-update__label">▪️ 작성일: </strong>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="notice-update__input"
              />
            </li>
            <li className="notice-update__item">
              <strong className="notice-update__label">▪️ 내용: </strong>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="notice-update__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="notice-update__footer">
          <button className="notice-update__cancle" onClick={onClose}>
            취소
          </button>
          <button className="notice-update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeUpdate;
