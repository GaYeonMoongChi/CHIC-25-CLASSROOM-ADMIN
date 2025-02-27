import React, { useState } from "react";
import "../css/noticeAdvertisingModal.css";

const AdvertisingUpdate = ({ advertising, submit, onClose }) => {
  // 수정할 값들의 상태
  const [title, setTitle] = useState(advertising.title);
  const [writer, setWrite] = useState(advertising.writer);
  const [startdate, setStartdate] = useState(advertising.startdate);
  const [enddate, setEnddate] = useState(advertising.enddate);
  const [content, setContent] = useState(advertising.explanation);

  if (!advertising) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="advertising-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="advertising-update__title">홍보/광고글 수정</h1>
        </header>

        <main className="advertising-update__main">
          <ul className="advertising-update__list">
            <li className="advertising-update__item">
              <strong className="advertising-update__label">▪️ 작성자: </strong>
              <input
                type="text"
                value={writer}
                onChange={(e) => setWrite(e.target.value)}
                className="advertising-update__input"
              />
            </li>
            <li className="advertising-update__item">
              <strong className="advertising-update__label">
                ▪️ 글 제목:{" "}
              </strong>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="advertising-update__input"
              />
            </li>
            <li className="advertising-create__item">
              <strong className="advertising-create__label">
                ▪️ 적용시작일:
              </strong>
              <input
                type="date"
                className="advertising-create__input"
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
              />
            </li>
            <li className="advertising-create__item">
              <strong className="advertising-create__label">
                ▪️ 적용종료일:
              </strong>
              <input
                type="date"
                className="advertising-create__input"
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
              />
            </li>
            <li className="advertising-update__item">
              <strong className="advertising-update__label">▪️ 내용: </strong>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="advertising-update__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="advertising-update__footer">
          <button className="advertising-update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AdvertisingUpdate;
