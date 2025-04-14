import React, { useState } from "react";
import axios from "axios";
import "../css/reservationModal.css";

const ClassPdfUpload = ({
  onClose,
  onUploadComplete,
  existingSemesters = [],
}) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 입력 상태 관리
  const [semester, setSemester] = useState("");
  const [isNewSemester, setIsNewSemester] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  // PDF 파일 형식이 아닐 경우 예외처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("PDF 파일만 업로드할 수 있습니다.");
      return;
    }
    setPdfFile(file);
  };

  // 학기 선택 변경 상태
  const handleSemesterChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setIsNewSemester(true);
      setSemester("");
    } else {
      setIsNewSemester(false);
      setSemester(value);
    }
  };

  const handleSubmit = async () => {
    // 모든 항목이 입력되지 않았을 경우 예외처리
    if (!semester || !pdfFile) {
      alert("학기 정보와 PDF 파일을 모두 입력해주세요.");
      return;
    }

    const isAlreadyRegistered = existingSemesters.includes(semester);

    // 이미 등록된 학기에 대한 강의계획서 업로드 시도할 경우 메세지 출력
    if (isAlreadyRegistered) {
      const confirmOverwrite = window.confirm(
        `${semester} 학기에는 이미 업로드된 자료가 있습니다. 덮어쓰시겠습니까?`
      );
      if (!confirmOverwrite) return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
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

      // 업로드 완료 후 콜백 실행
      if (onUploadComplete) {
        onUploadComplete(semester);
      }

      handleClose();
    } catch (error) {
      console.error("강의 등록 오류:", error);
      alert("강의 등록에 실패했습니다.");
    }
  };

  // 입력값 초기화 후 모달창 닫기
  const handleClose = () => {
    setSemester("");
    setPdfFile(null);
    setIsNewSemester(false);
    onClose();
  };

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
            <li
              className={`class-create__item ${
                isNewSemester ? "new-semester" : ""
              }`}
            >
              <strong className="class-create__label">▪️ 년도-학기: </strong>
              <select
                className="class-create__input"
                value={isNewSemester ? "new" : semester}
                onChange={handleSemesterChange}
              >
                <option value="">학기를 선택하세요</option>
                {existingSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
                <option value="new">새 학기 직접 입력</option>
              </select>
              {isNewSemester && (
                <input
                  type="text"
                  placeholder=" '2025-2' 형식으로 입력하세요."
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="class-create__input"
                />
              )}
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
              {pdfFile && <p>선택된 파일: {pdfFile.name}</p>}
            </li>
          </ul>

          <div className="class-create__submit_div">
            <button className="class-create__submit" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassPdfUpload;
