import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classPage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassName from "../../Components/ReservationAdmin/Class/ClassName";
import ClassCreate from "../../Components/ReservationAdmin/Class/ClassCreate";
import ClassPdfUpload from "../../Components/ReservationAdmin/Class/ClassPdfUpload";
import LogoutButton from "../../Components/LogoutButton";
import { useNavigate } from "react-router-dom";

const ClassInfoPage = () => {
  // 백앤드 주소 | 네비게이트 상수 선언
  const BACKEND_URL = "http://localhost:8000/api/class";
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

  // 강의 데이터, 학기 데이터
  const [classInfo, setClassInfo] = useState([]);
  const [semester, setSemester] = useState([]);

  const [semesterList, setSemesterList] = useState([]);

  // 검색값 (강의명, 교수명)
  const [searchProfName, setSearchProfName] = useState("");
  const [searchClassName, setSearchClassName] = useState("");

  // 검색 입력값 (강의명, 교수명)
  const onChangeClassName = (e) => setSearchClassName(e.target.value);
  const onChangeProfName = (e) => setSearchProfName(e.target.value);

  const fetchClasses = async () => {
    // 강의 데이터 요청
    try {
      const response = await axios.get(`${BACKEND_URL}/${semester}`);
      const data = response.data;

      console.log("받아온 강의 데이터:", data);

      if (Array.isArray(data.classes)) {
        setClassInfo(data.classes);
      } else {
        console.error("classes가 배열이 아닙니다:", data.classes);
      }
    } catch (error) {
      console.error("강의실 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 학기 데이터 요청
  const fetchSemester = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/collections`);
      const data = response.data;

      console.log("받아온 학기 데이터:", data);

      if (Array.isArray(data.collections) && data.collections.length > 0) {
        setSemester(data.collections[0]); // 최신 학기를 default로 화면에 띄움.
        setSemesterList(data.collections);
      }
    } catch (error) {
      console.error("학기 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // token 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }

    fetchSemester();
  }, [navigate]);

  useEffect(() => {
    if (semester) {
      fetchClasses();
    }
  }, [semester]);

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
      (searchClassName === "" ||
        cls.class_name
          ?.toLowerCase()
          .includes(searchClassName.toLowerCase())) &&
      (searchProfName === "" || cls.prof_name?.includes(searchProfName))
    );
  });

  // 학기 선택 핸들러
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

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
            시간표 파일 등록
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* 검색바 */}
      <div className="classroom-info__search">
        <ul className="classroom-info__search-list">
          <li className="classroom-info__search-item">
            <label
              htmlFor="semester-select"
              className="classroom-info__search-label"
            >
              학기
            </label>
            <select
              id="semester-select"
              className="classroom-info__search-input"
              value={semester}
              onChange={handleSemesterChange}
            >
              {semesterList.map((sem, idx) => (
                <option key={idx} value={sem}>
                  {sem}
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
                semester={semester}
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
        <ClassCreate
          onClose={toggleCreateModal}
          onCreate={handleCreateClass}
          semester={semester}
        />
      )}

      {/* PDF 업로드 모달 */}
      {isPdfModalOpen && <ClassPdfUpload onClose={togglePdfModal} />}
    </div>
  );
};

export default ClassInfoPage;
