import React, { useState } from "react";
import "../../../Pages/css/Pages.css";
import "../css/noticeAdvertisingModal.css";
import NoticeRow from "./NoticeRow";

const NoticeDelete = ({ notice, submit, onClose }) => {
  // 삭제할 공지글 선택 상태 관리
  const [selectedNotice, setSelectedNotice] = useState([]);

  // 공지글 선택 체크박스 생성
  const toggleSelectNotice = (id) => {
    setSelectedNotice((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  if (!notice || !Array.isArray(notice)) return null; // notice 배열이 넘어오지 않았거나, 배열이 아닐 경우 예외 처리

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>

        <footer className="notice-delete__footer">
          <button className="notice-delete__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeDelete;
