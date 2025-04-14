import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassName from "../../Components/ReservationAdmin/Class/ClassName";
import ClassCreate from "../../Components/ReservationAdmin/Class/ClassCreate";
import ClassPdfUpload from "../../Components/ReservationAdmin/Class/ClassPdfUpload";
import LogoutButton from "../../Components/LogoutButton";
import { useNavigate } from "react-router-dom";

const ClassInfoPage = () => {
  // 백앤드 주소 | 네비게이트 상수 선언
  const BACKEND_URL = "http://localhost:8000";
  const navigate = useNavigate();

  // 사이드바
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 강의 개별 등록 모달
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 강의계획서 업로드 모달
  const [isPdfModalOpen, setPdfModalOpen] = useState(false);
  const togglePdfModal = () => setPdfModalOpen((prev) => !prev);

  // 강의 데이터
  const [classInfo, setClassInfo] = useState([]);

  // 검색값 (강의명, 교수명)
  const [searchProfName, setSearchProfName] = useState("");
  const [searchClassName, setSearchClassName] = useState("");

  // 검색 입력값 (강의명, 교수명)
  const onChangeClassName = (e) => setSearchClassName(e.target.value);
  const onChangeProfName = (e) => setSearchProfName(e.target.value);

  // 학기 선택값, 입력값
  const [semesterList, setSemesterList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const fetchClasses = async () => {
    // 강의 데이터 요청
    try {
      const response = await axios.get(`${BACKEND_URL}/api/class`);
      const data = response.data;

      if (Array.isArray(data.classes)) {
        setClassInfo(data.classes);

        const semesters = Array.from(
          new Set(data.classes.map((cls) => cls.semester))
        );

        // 학기를 내림차순 정렬 (예: 2025-2 > 2025-1 > 2024-2 ...)
        semesters.sort((a, b) => (a < b ? 1 : -1));

        setSemesterList(semesters);

        // 최신 학기를 기본 선택
        if (semesters.length > 0) {
          setSelectedSemester(semesters[0]);
        }
      } else {
        console.error("classes가 배열이 아닙니다:", data.classes);
      }
    } catch (error) {
      console.error("강의실 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // token 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }

    fetchClasses();
  }, [navigate]);

  // 학기 선택 항목들 생성
  const handleUploadComplete = (uploadedSemester) => {
    setSemesterList((prev) => {
      const newList = prev.includes(uploadedSemester)
        ? prev
        : [...prev, uploadedSemester];
      return newList.sort((a, b) => (a < b ? 1 : -1)); // 최신 순 정렬
    });

    setSelectedSemester(uploadedSemester); // 업로드된 학기를 선택
    fetchClasses(); // 강의 정보 새로고침
  };

  // 새로고침 없이 등록, 수정, 삭제 내용 화면에 반영
  const handleCreateClass = (newClass) => {
    setClassInfo((prevClasses) => [...prevClasses, newClass]);
  };

  const handleUpdateClass = (updatedClass, deletedIds) => {
    if (updatedClass) {
      setClassInfo((prevClass) =>
        prevClass.map((cls) =>
          cls.class_idx === updatedClass.class_idx ? updatedClass : cls
        )
      );
    } else if (deletedIds && deletedIds.length > 0) {
      setClassInfo((prev) =>
        prev.filter((cls) => !deletedIds.includes(cls.class_idx))
      );
    }
  };

  // 검색 필터링
  const filteredClasses = classInfo.filter((cls) => {
    return (
      cls.semester === selectedSemester &&
      (searchClassName === "" ||
        cls.class_name
          ?.toLowerCase()
          .includes(searchClassName.toLowerCase())) &&
      (searchProfName === "" || cls.prof_name?.includes(searchProfName))
    );
  });

  return (
    <div className="div">
      {/* 헤더 */}
      <div className="class-info-update__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="class-info-update__title">강의 정보 관리</h1>
        <div className="class-info-update__nav">
          <button
            className="class-info-update__action-create"
            onClick={toggleCreateModal}
          >
            강의 등록
          </button>
          <button
            className="class-info-update__action-create"
            onClick={togglePdfModal}
          >
            강의계획서 등록
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* 검색바 */}
      <div className="classroom-info__search">
        <ul className="classroom-info__search-list">
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">학기</label>
            <select
              value={selectedSemester}
              onChange={handleSemesterChange}
              className="classroom-info__search-select"
            >
              {semesterList.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </li>
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">강의명</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="강의명으로 검색하세요."
              onChange={onChangeClassName}
              value={searchClassName}
            />
          </li>
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">교수명</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="교수명으로 검색하세요."
              onChange={onChangeProfName}
              value={searchProfName}
            />
          </li>
        </ul>
      </div>

      {/* 강의정보 리스트 */}
      <div className="class-info-update__main">
        <table className="class-info-update__table">
          <tbody>
            {filteredClasses.map((classes, index) => (
              <ClassName
                key={index}
                classes={classes}
                onUpdate={handleUpdateClass}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 등록 모달 */}
      {isCreateModalOpen && (
        <ClassCreate onClose={toggleCreateModal} onCreate={handleCreateClass} />
      )}

      {/* PDF 업로드 모달 */}
      {isPdfModalOpen && (
        <ClassPdfUpload
          onClose={togglePdfModal}
          onUploadComplete={handleUploadComplete}
          existingSemesters={semesterList}
        />
      )}
    </div>
  );
};

export default ClassInfoPage;
