import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/noticeModal.css";

const NoticeCreate = ({ onClose, onCreate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 모달 열릴 때 스크롤 금지되도록 설정
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 관리자 아이디 가져오기
  const adminInfoId = localStorage.getItem("admin_info_id");

  // 공지사항 입력값 상태 관리
  const [noticeData, setNoticeData] = useState({
    admin_info_id: adminInfoId,
    type: "", // string "0" 이면 false or "1" 이면 true
    start_date: new Date(),
    end_date: new Date(),
    title: "",
    contents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({
      ...prev,
      [name]: value ? new Date(value) : null,
    }));
  };

  // 공지사항 등록 요청 api
  const handleSubmit = async () => {
    if (!noticeData.title || !noticeData.contents) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const dataToSend = {
      admin_info_id: noticeData.admin_info_id,
      type: noticeData.type === "1", // 문자열을 boolean으로 변환
      title: noticeData.title,
      contents: noticeData.contents,
    };

    if (noticeData.type === "1") {
      dataToSend.start_date = noticeData.start_date;
      dataToSend.end_date = noticeData.end_date;
    }

    try {
      console.log("보내는 데이터:", dataToSend);
      const response = await axios.post(
        `${BACKEND_URL}/api/notice`,
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("공지 등록이 완료되었습니다.");
      onCreate?.(response.data.notice);
      handleClose();
    } catch (error) {
      console.error("공지 등록 오류:", error);
      alert("공지 등록에 실패했습니다.");
    }
  };

  // 모달창 닫을때 입력값 초기화
  const handleClose = () => {
    setNoticeData({
      admin_info_id: adminInfoId || "",
      type: false,
      start_date: null,
      end_date: null,
      title: "",
      contents: "",
    });
    onClose();
  };

  // 엔터키 눌러도 등록 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="notice-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="notice-create__title">공지글 생성</h1>
        </header>

        <div className="notice-create__main">
          <ul className="notice-create__list">
            <li className="notice-create__item">
              <label className="notice-create__label">▪️ 공지글 유형</label>
              <select
                name="type"
                onChange={handleChange}
                value={noticeData.type}
              >
                <option disabled value="">
                  공지글 유형을 선택하세요.
                </option>
                <option value="0">고정 게시글</option>
                <option value="1">팝업</option>
              </select>
            </li>

            {noticeData.type === "1" && (
              <>
                <li className="notice-create__item">
                  <label className="notice-create__label">
                    ▪️ 시작-종료 날짜
                  </label>
                  <div className="notice-create__item_div">
                    <input
                      className="notice-create__input"
                      type="date"
                      name="start_date"
                      value={
                        noticeData.start_date
                          ? new Date(noticeData.start_date)
                              .toISOString()
                              .split("T")[0]
                          : todayStr
                      }
                      onChange={handleDateChange}
                    />
                    -
                    <input
                      className="notice-create__input"
                      type="date"
                      name="end_date"
                      value={
                        noticeData.end_date
                          ? new Date(noticeData.end_date)
                              .toISOString()
                              .split("T")[0]
                          : todayStr
                      }
                      onChange={handleDateChange}
                    />
                  </div>
                </li>
              </>
            )}

            <li className="notice-create__item">
              <label className="notice-create__label">▪️ 공지글 제목</label>
              <input
                type="text"
                className="notice-create__input"
                placeholder="공지 제목을 입력하세요."
                name="title"
                value={noticeData.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </li>

            <li className="notice-create__item">
              <label className="notice-create__label">▪️ 공지글 내용</label>
              <textarea
                className="notice-create__textarea"
                placeholder="공지 내용을 입력하세요."
                name="contents"
                value={noticeData.contents}
                onChange={handleChange}
              ></textarea>
            </li>
          </ul>
        </div>

        <div className="notice-create__submit_span">
          <button className="notice-create__submit" onClick={handleSubmit}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeCreate;
