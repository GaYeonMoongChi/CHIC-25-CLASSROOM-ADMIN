import React, { useState } from "react";
import axios from "axios";
import "../css/reservationModal.css";

const ClassPdfUpload = ({ onClose }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 입력 상태 관리
  const [semester, setSemester] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  // 로딩 상태 관리
  const [isUploading, setIsUploading] = useState(false);

  // PDF 파일 형식이 아닐 경우 예외처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("PDF 파일만 업로드할 수 있습니다.");
      return;
    }
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    // pdf 파일이 아닐 경우 예외처리
    if (!semester || !pdfFile) {
      alert("학기 정보와 PDF 파일을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/pdf-upload/${semester}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("강의 등록이 완료되었습니다.");
      console.log("강의 등록 성공:", response.data);

      handleClose();
    } catch (error) {
      console.error("강의 등록 오류:", error);
      alert("강의 등록에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 입력값 초기화 후 모달창 닫기
  const handleClose = () => {
    setSemester("");
    setPdfFile(null);
    onClose();
  };

  // 엔터키 눌러도 등록 완료 되게
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="class-create__title">강의 계획서 업로드</h1>
        </header>

        <main className="classr-create__main">
          <ul className="class-create__list">
            <li className="class-create__item">
              <strong className="class-create__label">▪️ 년도-학기: </strong>
              <input
                type="text"
                placeholder=" '2025-2' 형식으로 입력하세요."
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                onKeyDown={handleKeyDown}
                className="class-create__input"
              />
            </li>

            <li className="class-create__item">
              <strong className="class-create__label">
                ▪️ 강의 계획서 (PDF):
              </strong>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="class-create__input"
              />
            </li>
          </ul>

          <div className="class-create__submit_div">
            <button
              className={`class-create__submit ${
                isUploading ? "disabled" : ""
              }`}
              onClick={handleSubmit}
              disabled={isUploading}
            >
              완료
            </button>
          </div>
        </main>

        {isUploading && (
          <div className="uploading-text">강의 데이터 등록 중...</div>
        )}
      </div>
    </div>
  );
};

export default ClassPdfUpload;
