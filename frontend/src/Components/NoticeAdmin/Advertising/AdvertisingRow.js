import React, { useState } from "react";
import DetailModal from "./AdvertisingDetail";
import "../css/advertisingRow.css";

const AdvertisingRow = ({ advertising, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="advertising-page__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="advertising-page__row">
          <td className="advertising-page__table-cell">{advertising.date}</td>
          <td className="advertising-page__divider"></td>
          <td className="advertising-page__table-cell">{advertising.title}</td>
        </tr>
      </div>

      {isModalOpen && (
        <DetailModal
          advertising={advertising}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default AdvertisingRow;
