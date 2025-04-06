import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./css/noticeModal.css";

const NoticeCreate = ({ onClose, onCreate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 등록할 내용 상태 관리
  const [advertisingData, setAdvertisingData] = useState({
    notice_idx: uuidv4(), // UUID로 idx값 자동 생성
    account_idx: "1",
    title: "",
    contents: "",
    file_url: null,
    endtime: "",
  });

  // 공지글 등록 요청
  const handleChange = (e) => {
    setAdvertisingData({ ...advertisingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!advertisingData.title || !advertisingData.contents) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    Object.keys(advertisingData).forEach((key) => {
      formData.append(key, advertisingData[key]);
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/api/board`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("광고 등록이 완료되었습니다.");

      if (onCreate) {
        onCreate(response.data);
      }

      handleClose();
    } catch (error) {
      console.error("광고 등록 오류:", error);
      alert("광고 등록에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setAdvertisingData({
      notice_idx: "",
      account_idx: "1",
      title: "",
      contents: "",
      file_url: null,
      endtime: "",
    });
    onClose();
  };

  // 엔터키 눌러도 등록 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-create__title">공지글 생성</h1>
        </header>

        {/* 공지글 작성 */}
        <div className="notice-create__main">
          <ul className="notice-create__list">
            <li className="notice-create__item">
              <input
                type="text"
                className="notice-create__input"
                placeholder="공지 제목을 입력하세요."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></input>
            </li>
            <li className="notice-create__item">
              <select name="notice-type" onChange={handleChange}>
                <option disabled value="">
                  공지글 유형을 선택하세요.
                </option>
                <option value="notice">고정 게시글</option>
                <option value="pop-up">팝업</option>
              </select>
            </li>
            <li className="notice-create__item">
              <textarea
                type="text"
                className="notice-create__textarea"
                placeholder="공지 내용을 입력하세요."
                onChange={handleChange}
              ></textarea>
            </li>
          </ul>

          {/* 등록 완료 버튼 */}
          <div className="notice-create__submit_div">
            <button className="notice-create__submit" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCreate;
