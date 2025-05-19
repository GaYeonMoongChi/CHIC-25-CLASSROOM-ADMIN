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
import { debounce } from "lodash";
import BuildingRooms from "../../Components/ReservationAdmin/Reservation/BuildingRooms";
import ReservationSearchBar from "../../Components/ReservationAdmin/Reservation/ReservationSearchBar";

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
  const [searchRoom, setSearchRoom] = useState("102호");
  const [searchBuilding, setBuilding] = useState("새빛관");
  const [availableRooms, setAvailableRooms] = useState([]);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 새 예약 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 새 예약 상태
  const [newReservations, setNewReservations] = useState([]);

  // 강의실 사용 정보 데이터
  const [reservationsInfo, setReservationsInfo] = useState([]);

  // 검색어 변경 핸들러
  const onChangeRoom = (event) => {
    setSearchRoom(event.target.value);
  };
  const onChangeBuilding = (e) => {
    const selectedBuilding = e.target.value;
    setBuilding(selectedBuilding);

    if (BuildingRooms[selectedBuilding]) {
      setAvailableRooms(BuildingRooms[selectedBuilding]);
      setSearchRoom(BuildingRooms[selectedBuilding][0]);
    } else {
      setAvailableRooms([]);
      setSearchRoom(""); // 초기화
    }
  };
  const onChangeDate = (e) => setSearchDate(e.target.value);
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // 학기 정렬 (ex. ["2025-겨울", "2025-2", "2025-여름", "2025-1", "2024-겨울", "2024-2"])
  const sortSemesterList = (list) => {
    const semesterOrder = { 겨울: 4, 2: 3, 여름: 2, 1: 1 };

    return [...list].sort((a, b) => {
      const [aYear, aSem] = a.split("-");
      const [bYear, bSem] = b.split("-");

      // 연도 비교 (내림차순: 큰 연도 먼저)
      if (parseInt(aYear) !== parseInt(bYear)) {
        return parseInt(bYear) - parseInt(aYear);
      }

      // 학기 비교 (겨울 > 2 > 여름 > 1 순으로)
      return semesterOrder[bSem] - semesterOrder[aSem];
    });
  };

  // 학기 데이터 요청
  const fetchSemester = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/class/collections`);
      const data = response.data;

      if (Array.isArray(data.collections) && data.collections.length > 0) {
        const sortedList = sortSemesterList(data.collections);
        setSemesterList(sortedList);
        setSemester(sortedList[0]);
      }
    } catch (error) {
      console.error("학기 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 강의실 사용 현황 데이터 요청 (Default: '2025-2', '새빛관', '102', today)
  const fetchReservations = useCallback(async () => {
    if (!semester) return;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/appointment-status/${semester}?building=${searchBuilding}&room=${searchRoom}&date=${searchDate}`
      );

      console.log("응답 데이터:", response.data);
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
    }
  }, [semester, searchBuilding, searchRoom, searchDate]);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchReservations();
    }, 500);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchReservations]);

  useEffect(() => {
    if (BuildingRooms[searchBuilding]) {
      const rooms = BuildingRooms[searchBuilding];
      setAvailableRooms(rooms);
      setSearchRoom(rooms[0]);
    }
  }, []);

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }

    fetchSemester();
    fetchNewReservations();
  }, [navigate]);

  // 예약 리스트 가져오기
  const fetchNewReservations = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/reserve/check`);
      const data = response.data?.data || [];

      setNewReservations(data);
    } catch (error) {
      console.error("새 예약 불러오기 실패:", error);
    }
  };

  // 새 예약 확인 (읽음 처리)
  const markAsChecked = async (reservationId) => {
    try {
      await axios.post(`${BACKEND_URL}/reserve/${reservationId}/check`);
      setNewReservations((prev) =>
        prev.map((r) =>
          r._id === reservationId ? { ...r, status: "checked" } : r
        )
      );
    } catch (error) {
      console.error("예약 확인 처리 실패:", error);
    }
  };

  return (
    <div className="div">
      {/* 헤더 */}
      <div className="reservation-status__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="reservation-status__title">
          <img src={KW_logo} alt="⏰" />
          KW 강의실 사용현황
        </h1>
        <div className="reservation-status__nav">
          <button onClick={openModal}>
            새 예약{" "}
            <span>
              {newReservations.filter((item) => item.status === "new").length}
            </span>
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* 검색바 */}
      <ReservationSearchBar
        semester={semester}
        semesterList={semesterList}
        searchBuilding={searchBuilding}
        searchRoom={searchRoom}
        searchDate={searchDate}
        availableRooms={availableRooms}
        handleSemesterChange={handleSemesterChange}
        onChangeBuilding={onChangeBuilding}
        onChangeRoom={onChangeRoom}
        onChangeDate={onChangeDate}
      />

      {/* 타임 테이블*/}
      <div className="reservation-status__main">
        <Timetable
          reservations={reservationsInfo}
          date={searchDate}
          building={searchBuilding}
          roomId={searchRoom}
        />
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {isModalOpen && (
        <NewReservation
          onClose={closeModal}
          onCheck={markAsChecked}
          reservation={newReservations}
          fetchNewReservations={fetchNewReservations}
        />
      )}
    </div>
  );
};

export default RoomReservationStatusPage;
