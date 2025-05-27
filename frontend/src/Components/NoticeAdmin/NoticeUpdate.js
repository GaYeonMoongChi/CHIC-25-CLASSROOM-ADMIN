import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/noticeModal.css";

const NoticeUpdate = ({ notice, onClose, onUpdate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 모달 열릴 때 스크롤 금지되도록 설정
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 수정할 값들의 상태
  const [noticeData, setNoticeData] = useState({
    title: notice?.title || "",
    contents: notice?.contents || "",
  });

  useEffect(() => {
    if (notice) {
      setNoticeData({
        title: notice.title,
        contents: notice.contents,
      });
    }
  }, [notice]);

  // 공지글 정보 수정 요청
  const handleUpdate = async () => {
    if (!notice._id) {
      alert("공지글 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/notice/${notice._id}`,
        noticeData
      );

      if (response.status === 200) {
        alert("공지글이 수정되었습니다.");

        if (onUpdate) {
          onUpdate(response.data.data);
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-update__title">
            공지글 수정
            <span className="notice-update__submit_span">
              <button className="notice-update__submit" onClick={handleUpdate}>
                완료
              </button>
            </span>
          </h1>
        </header>

        <main className="notice-update__main">
          <ul className="notice-update__list">
            <li className="notice-update__item">
              <strong className="notice-details__label">▪️ 작성일 </strong>
              <input
                type="text"
                value={noticeData.title}
                onChange={(e) =>
                  setNoticeData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="notice-update__input"
                onKeyDown={handleKeyDown}
                placeholder="공지 제목을 입력하세요."
              />
            </li>

            <li className="notice-update__item">
              <strong className="notice-details__label">▪️ 내용 </strong>
              <textarea
                value={noticeData.contents}
                onChange={(e) =>
                  setNoticeData((prev) => ({
                    ...prev,
                    contents: e.target.value,
                  }))
                }
                className="notice-update__textarea"
                placeholder="공지 내용을 입력하세요."
              ></textarea>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default NoticeUpdate;
