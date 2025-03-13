import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../css/noticeAdvertisingModal.css";

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

  // 광고글 등록 요청
  const handleChange = (e) => {
    setAdvertisingData({ ...advertisingData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAdvertisingData({ ...advertisingData, file_url: e.target.files[0] });
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

        <main className="notice-create__main">
          <ul className="notice-create__list">
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 작성자: </strong>
              <input
                type="text"
                className="notice-create__input"
                placeholder="작성자를 입력하세요. (ex. 관리자, 공지관리자)"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 제목: </strong>
              <input
                type="text"
                className="notice-create__input"
                placeholder="공지 제목을 입력하세요."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></input>
            </li>
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 내용: </strong>
              <textarea
                type="text"
                className="notice-create__textarea"
                placeholder="공지 내용을 입력하세요."
                onChange={handleChange}
              ></textarea>
            </li>
            <li className="notice-create__item">
              <strong className="notice-create__label">▪️ 이미지파일: </strong>
              <input
                type="file"
                className="notice-create__input"
                placeholder="이미지 파일을 업로드 해주세요."
                onChange={handleFileChange}
              ></input>
            </li>
          </ul>
        </main>

        <footer className="notice-create__footer">
          <button className="notice-create__submit" onClick={handleSubmit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoticeCreate;
