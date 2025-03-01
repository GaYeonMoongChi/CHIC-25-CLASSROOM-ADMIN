import React, { useState } from "react";
import axios from "axios";
import "../../../Pages/css/Pages.css";
import "../css/noticeAdvertisingModal.css";
import NoticeRow from "./NoticeRow";

const NoticeDelete = ({ notice, onClose, onDelete }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 삭제할 공지글 선택 상태 관리
  const [selectedNotice, setSelectedNotice] = useState([]);

  // 공지글 선택 체크박스 생성
  const toggleSelectNotice = (id) => {
    setSelectedNotice((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  // 공지글 요청
  const handleDelete = async () => {
    if (selectedNotice) {
      alert("삭제할 공지글을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/board`, {
        data: { ids: selectedNotice },
      });

      alert(response.data.message || "공지글 삭제가 완료되었습니다.");

      if (onDelete) {
        onDelete(selectedNotice);
      }

      onClose();
    } catch (error) {
      console.error("공지글 삭제 오류:", error);
      alert("공지글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 삭제 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleDelete();
    }
  };

  if (!notice || !Array.isArray(notice)) return null; // notice 배열이 넘어오지 않았거나, 배열이 아닐 경우 예외 처리

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-delete__header">
          <h1 className="notice-delete__title">공지글 삭제</h1>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="notice-delete__main_div">
          <main className="notice-delete__main">
            <table className="notice-delete__table">
              <tbody>
                {notice.map((noticeItem, index) => (
                  <tr key={noticeItem.id}>
                    <td>
                      <NoticeRow key={index} notice={noticeItem} />
                    </td>
                    <td className="notice-delete__td">
                      <input
                        type="checkbox"
                        checked={selectedNotice.includes(noticeItem.id)}
                        onChange={() => toggleSelectNotice(noticeItem.id)}
                        className="notice-delete__checkbox"
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>

        <footer className="notice-delete__footer">
          <button className="notice-delete__submit" onClick={handleDelete}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeDelete;
