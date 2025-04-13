import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassName from "../../Components/ReservationAdmin/Class/ClassName";
import ClassCreate from "../../Components/ReservationAdmin/Class/ClassCreate";
import ClassDelete from "../../Components/ReservationAdmin/Class/ClassDelete";
import LogoutButton from "../../Components/LogoutButton";
import { useNavigate } from "react-router-dom";

const ClassInfoPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태 관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  // 강의 정보 상태 관리
  const [classInfo, setClassInfo] = useState([]);

  // 검색값 상태 관리
  const [searchIdx, setSearchIdx] = useState("");
  const [searchProfName, setSearchProfName] = useState("");
  const [searchClassName, setSearchClassName] = useState("");

  // 검색창에 값 입력하면 상태 변환
  const onChangeIdx = (e) => setSearchIdx(e.target.value);
  const onChangeClassName = (e) => setSearchClassName(e.target.value);
  const onChangeProfName = (e) => setSearchProfName(e.target.value);

  // 검색 결과 화면에 반영
  const filteredClassrooms = classInfo.filter((classes) => {
    return (
      (searchIdx === "" || classes.class_idx?.toString().includes(searchIdx)) &&
      (searchClassName === "" ||
        classes.class_name
          ?.toLowerCase()
          .includes(searchClassName.toLowerCase())) &&
      (searchProfName === "" || classes.prof_name?.includes(searchProfName))
    );
  });

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다."); // 토큰이 없으면 알림창을 띄움
      navigate("/"); // 로그인 페이지로 리다이렉트
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/class`);
        const data = response.data;

        if (Array.isArray(data.classes)) {
          setClassInfo(data.classes);
        } else {
          console.error("classes가 배열이 아닙니다:", data.classes);
        }
      } catch (error) {
        console.error("강의실 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchClasses();
  }, [navigate]);

  // 등록된 내용 새로고침 없이 업데이트
  const handleCreateClass = (newClasses) => {
    setClassInfo((prevClasses) => [...prevClasses, newClasses]);
  };

  // 수정,삭제 결과 새로고침 없이 화면에 바로 반영
  const handleUpdateClass = (updatedClass, deletedIds) => {
    if (updatedClass) {
      setClassInfo((prevClass) =>
        prevClass.map((classes) =>
          classes.class_idx === updatedClass.class_idx ? updatedClass : classes
        )
      );
    } else if (deletedIds && deletedIds.length > 0) {
      setClassInfo((prev) =>
        prev.filter((cls) => !deletedIds.includes(cls.class_idx))
      );
    }
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
          <LogoutButton />
        </div>
      </div>

      {/* 검색바 */}
      <div className="classroom-info__search">
        <ul className="classroom-info__search-list">
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">학정번호</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="학정번호로 검색하세요."
              onChange={onChangeIdx}
              value={searchIdx}
            />
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
            <label
              htmlFor="search-author"
              className="classroom-info__search-label"
            >
              교수명
            </label>
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
            {filteredClassrooms.map((classes, index) => (
              <ClassName
                key={index}
                classes={classes}
                onUpdate={handleUpdateClass}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 등록 모달창 */}
      {isCreateModalOpen && (
        <ClassCreate onClose={toggleCreateModal} onCreate={handleCreateClass} />
      )}
    </div>
  );
};

export default ClassInfoPage;
