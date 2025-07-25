import React, { useState, useEffect } from "react";
import "./css/noticeModal.css";
import NoticeUpdate from "./NoticeUpdate";

const DetailModal = ({ notice, onClose, onUpdate, formatDate }) => {
  // 백앤드 주소
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // 모달 열릴 때 스크롤 금지되도록 설정
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 수정 모달 상태
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  // 로컬 notice 상태 (수정된 값 바로 반영)
  const [localNotice, setLocalNotice] = useState(notice);

  if (!notice) return null;

  // 데이터 없으면 '정보없음' 처리
  const displayValue = (value) => {
    if (value === null || value === undefined || value === "" || value === 0) {
      return "정보없음";
    }
    return value;
  };

  // 공지사항 삭제 API
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `"${displayValue(localNotice.title)}" 공지사항을 삭제하시겠습니까?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/notice/${localNotice._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("공지사항이 삭제되었습니다.");
        onUpdate(null, localNotice.title, localNotice.contents);
        onClose(); // 모달 닫기
      } else {
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-details__title">
            <span
              className={`notice-page__type-${notice.type ? "pop-up" : "fix"}`}
            >
              {notice.type ? "팝업 게시글" : "고정 게시글"}
            </span>
            {displayValue(localNotice.title)}

            <span className="notice-details__actions">
              <button
                className="notice-details__update"
                onClick={switchUpdateMode}
              >
                공지글 수정
              </button>
              <button className="notice-details__delete" onClick={handleDelete}>
                공지글 삭제
              </button>
            </span>
          </h1>
        </header>

        <main className="notice-details__main">
          <ul className="notice-details__list">
            <li className="notice-details__item">
              <strong className="notice-details__label">▪ 작성일 </strong>
              <div className="notice-details__content">
                {formatDate && localNotice.created_at
                  ? formatDate(localNotice.created_at)
                  : displayValue(localNotice.created_at)}
              </div>
            </li>
            {notice.type === true && (
              <li className="notice-details__item">
                <strong className="notice-details__label">
                  ▪ 게시 시작 ~ 종료 날짜{" "}
                </strong>
                <div className="notice-details__content">
                  {formatDate && localNotice.start_date && localNotice.end_date
                    ? `${formatDate(localNotice.start_date)} ~ ${formatDate(localNotice.end_date)}`
                    : "정보없음"}{" "}
                  동안 게시됨
                </div>
              </li>
            )}
            <li className="notice-details__item">
              <strong className="notice-details__label">▪ 내용 </strong>
              <pre className="notice-details__content">
                {displayValue(localNotice.contents)}
              </pre>
            </li>
          </ul>
        </main>

        {/* 수정 모달 */}
        {isUpdateMode && (
          <NoticeUpdate
            notice={localNotice}
            submit={switchUpdateMode}
            onUpdate={(updatedData) => {
              setLocalNotice(updatedData);
              onUpdate(updatedData);
              switchUpdateMode();
            }}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default DetailModal;
