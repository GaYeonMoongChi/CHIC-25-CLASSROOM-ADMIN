import React, { useState } from "react";
import axios from "axios";
import "../css/noticeAdvertisingModal.css";

const NoticeUpdate = ({ notice, submit, onClose, onUpdate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 수정할 값들의 상태
  const [title, setTitle] = useState(notice.title);
  const [contents, setContents] = useState(notice.contents);

  // 공지글 정보 수정 요청
  const handleUpdate = async () => {
    if (!notice.id) {
      alert("공지글 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/board/${notice.notice_idx}`,
        { title, contents }
      );

      if (response.status === 200) {
        alert("공지글이 수정되었습니다.");

        if (onUpdate) {
          onUpdate({ id: notice.id, title, contents });
        }

        onClose(); // 수정 완료시 모달 닫기
      } else {
        alert(response.data.message || "공지글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("공지글 수정 오류:", error);
      alert("공지글 수정 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 수정 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

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
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="notice-update__item">
              <strong className="notice-update__label">▪️ 내용: </strong>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="notice-update__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="notice-update__footer">
          <button className="notice-update__submit" onClick={handleUpdate}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeUpdate;
