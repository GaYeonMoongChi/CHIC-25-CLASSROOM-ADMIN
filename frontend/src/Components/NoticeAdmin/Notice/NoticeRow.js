import React, { useState } from "react";
import DetailModal from "./NoticeDetail";
import "../css/noticeRow.css";

const NoticeRow = ({ notice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="notice-page__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="notice-page__row">
          <td className="notice-page__table-cell">{notice.date}</td>
          <td className="notice-page__divider"></td>
          <td className="notice-page__table-cell">{notice.title}</td>
        </tr>
      </div>

      {isModalOpen && (
        <DetailModal notice={notice} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default NoticeRow;
