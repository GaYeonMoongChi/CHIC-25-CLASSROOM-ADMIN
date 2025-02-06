import React, { useState } from "react";
import DetailModal from "./AdvertisingDetail";
import "../css/advertisingRow.css";

const AdvertisingRow = ({ advertising }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr className="advertising-page__row">
        <td className="advertising-page__table-cell">{advertising.date}</td>
        <td className="advertising-page__table-cell">{advertising.title}</td>
        <td className="advertising-page__table-cell">
          {advertising.startdate}
        </td>
        <td className="advertising-page__table-cell">{advertising.enddate}</td>

        <td className="advertising-page__table-cell">{advertising.writer}</td>
        <td className="advertising-page__table-cell">
          <button
            className="advertising-page__details-button"
            onClick={() => setIsModalOpen(true)}
          >
            상세보기
          </button>
        </td>
      </tr>

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
