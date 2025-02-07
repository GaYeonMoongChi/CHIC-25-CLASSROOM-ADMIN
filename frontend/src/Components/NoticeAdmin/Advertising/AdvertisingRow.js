import React, { useState } from "react";
import DetailModal from "./AdvertisingDetail";
import "../css/advertisingRow.css";

const AdvertisingRow = ({ advertising }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="advertising-page__row_div">
        <tr className="advertising-page__row">
          <td className="advertising-page__table-cell">{advertising.date}</td>
          <td className="advertising-page__divider"></td>
          <td className="advertising-page__table-cell">{advertising.title}</td>
        </tr>
        <button
          className="advertising-page__details-button"
          onClick={() => setIsModalOpen(true)}
        >
          상세보기
        </button>
      </div>

      {isModalOpen && (
        <DetailModal
          advertising={advertising}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AdvertisingRow;
