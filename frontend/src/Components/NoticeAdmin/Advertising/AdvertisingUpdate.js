import React, { useState } from "react";
import axios from "axios";
import "../css/noticeAdvertisingModal.css";

const AdvertisingUpdate = ({ advertising, submit, onClose, onUpdate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 수정할 값들의 상태
  const [title, setTitle] = useState(advertising.title);
  const [endtime, setEndtime] = useState(advertising.enddate);
  const [contents, setContents] = useState(advertising.explanation);

  // 공지글 정보 수정 요청
  const handleUpdate = async () => {
    if (!advertising.notice_idx) {
      alert("공지글 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/board/${advertising.notice_idx}`,
        { title, contents }
      );

      if (response.status === 200) {
        alert("공지글이 수정되었습니다.");

        if (onUpdate) {
          onUpdate({ notice_idx: advertising.notice_idx, title, contents });
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
              <strong className="advertising-update__label">
                ▪️ 글 제목:{" "}
              </strong>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="advertising-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="advertising-create__item">
              <strong className="advertising-create__label">
                ▪️ 적용종료일:
              </strong>
              <input
                type="date"
                className="advertising-create__input"
                value={endtime}
                onChange={(e) => setEndtime(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="advertising-update__item">
              <strong className="advertising-update__label">▪️ 내용: </strong>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="advertising-update__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="advertising-update__footer">
          <button className="advertising-update__submit" onClick={handleUpdate}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AdvertisingUpdate;
