import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timetable from "../../Components/ReservationAdmin/Reservation/TimeTable";
import "../css/Pages.css";
import "./css/roomReservationStatus.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import NewReservation from "../../Components/ReservationAdmin/Reservation/NewReservation";
import LogoutButton from "../../Components/LogoutButton";
import KW_logo from "../../Image/KW_logo.svg";
import moment from "moment";
import { debounce } from "lodash"; // lodash의 debounce 사용

const RoomReservationStatusPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000/api";

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 오늘 날짜 (문자열) 가져오기
  const today = moment().format("YYYY-MM-DD");

  // 필터링 되는 값들 상태 관리
  const [semester, setSemester] = useState("2025-2");
  const [semesterList, setSemesterList] = useState([]);

  const [searchDate, setSearchDate] = useState(today);
  const [searchRoom, setSearchRoom] = useState("102");
  const [searchBuilding, setBuilding] = useState("새빛관");

  // 로딩 상태
  const [isLoading, setLoading] = useState(false);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 새 예약 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 강의실 사용 정보 데이터
  const [reservationsInfo, setReservationsInfo] = useState([]);

  // 검색어 변경 핸들러
  const onChangeRoom = (event) => {
    setSearchRoom(event.target.value);
  };
  const onChangeBuilding = (e) => setBuilding(e.target.value);
  const onChangeDate = (e) => setSearchDate(e.target.value);
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // 날짜, 건물명, 강의실로 필터링
  const filteredReservations = reservationsInfo
    .filter(
      (res) =>
        (searchBuilding === "" || res.building?.includes(searchBuilding)) &&
        (searchRoom === "" || res.roomId?.includes(searchRoom))
    )
    .flatMap((res) =>
      res.reservation
        .filter((item) => !searchDate || item.date === searchDate) // 빈 문자열 처리
        .map((item) => ({
          ...item,
          roomId: res.roomId,
          building: res.building,
        }))
    );

  // 학기 데이터 요청
  const fetchSemester = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/class/collections`);
      const data = response.data;

      console.log("받아온 학기 데이터:", data);

      if (Array.isArray(data.collections) && data.collections.length > 0) {
        setSemester(data.collections[0]); // 첫 번째 값을 선택
        setSemesterList(data.collections);
      }
    } catch (error) {
      console.error("학기 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 강의실 사용 현황 데이터 요청 (Default: '2025-2', '새빛관', '102', today)
  const fetchReservations = useCallback(
    debounce(async () => {
      if (!semester) return;
      setLoading(true); // 로딩 시작
      try {
        const response = await axios.get(
          `${BACKEND_URL}/appointment-status/${semester}?building=${searchBuilding}&room=${searchRoom}&date=${searchDate}`
        );

        // 응답 데이터 구조 확인
        console.log("응답 데이터:", response.data);
        console.log("예약 데이터(results):", response.data.results);

        // 예약 데이터가 있으면 reservationsInfo에 설정
        const results = response.data.results || [];

        setReservationsInfo([
          {
            roomId: searchRoom,
            building: searchBuilding,
            reservation: results,
          },
        ]);
      } catch (error) {
        console.error("예약 현황 불러오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    }, 500),
    [semester, searchBuilding, searchRoom, searchDate]
  );

  // 강의실 현황 데이터 요청
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }

    fetchSemester();
  }, [navigate]);

  console.log("Filtered Reservations:", filteredReservations);
  console.log("Loading Status:", isLoading);

  return (
    <div className="div">
      {/* 헤더 */}
      <div className="reservation-status__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="reservation-status__title">
          <img src={KW_logo} alt="⏰" />
          강의실 예약현황
        </h1>
        <div className="reservation-status__nav">
          {/* TODO: 새 예약이 몇 개 있는지 수도 표시하면 좋을 듯. or 새 예약이 있으면 점으로만 표시*/}
          <button onClick={openModal}>
            새 예약 <span>5</span>
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="reservation-status__search">
        <ul className="reservation-status__search-list">
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
          <li className="reservation-status__search-item">
            <label
              htmlFor="search-author"
              className="reservation-status__search-label"
            >
              건물명
            </label>
            <input
              type="text"
              name="search"
              className="reservation-status__search-input"
              placeholder="건물명으로 검색하세요."
              onChange={onChangeBuilding}
              value={searchBuilding}
            />
          </li>
          <li className="reservation-status__search-item">
            <label className="reservation-status__search-label">호수</label>
            <input
              type="text"
              className="reservation-status__search-input"
              placeholder="강의실 호수를 입력하세요."
              onChange={onChangeRoom}
              value={searchRoom}
            />
          </li>
          <li className="reservation-status__search-item">
            <label className="reservation-status__search-label">날짜</label>
            <input
              type="text"
              className="reservation-status__search-input"
              placeholder="YYYY-MM-DD 형식으로 입력하세요."
              onChange={onChangeDate}
              value={searchDate}
            />
          </li>
        </ul>
      </div>

      {/* 타임 테이블*/}
      <div className="reservation-status__main">
        <Timetable reservations={reservationsInfo} loading={isLoading} />
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {isModalOpen && <NewReservation onClose={closeModal} />}
    </div>
  );
};

export default RoomReservationStatusPage;
