import React, { useState } from "react";
import "../css/Pages.css";
import "./css/classroomInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationSidebar";
import ClassroomRow from "../../Components/ClassroomRow";

const ClassroomInfoUpdatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const classroomInfo = [
    {
      number: "103 호",
      name: "정보융합학부실습실1",
      explanation: "정보융합학부 실습실입니다. 일반 PC가 구비되어 있습니다.",
    },
    {
      number: "104 호",
      name: "정보융합학부실습실2",
      explanation: "iMAC 프로 PC 40대가 구비된 실습실 입니다.",
    },
    {
      number: "205 호",
      name: "강의실",
      explanation:
        "SW융합대학의 강의가 이루어지는 곳입니다. 녹화강의복습시스템이 구비되어 있습니다.",
    },
    {
      number: "705 호",
      name: "정보융합학부 대학원 강의실",
      explanation: "정보융합학부 대학원 강의실 입니다.",
    },
  ];

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="classroom-info-update__header">
          <h1 className="classroom-info-update__title">강의실 정보 업데이트</h1>
          <button className="student-info-update__action-button">등록</button>
          <button className="student-info-update__action-button">삭제</button>
        </header>

        <main className="classroom-info-update__main">
          <table className="classroom-info-update__table" >
            <tbody>
              {classroomInfo.map((classroom, index) => (
                <ClassroomRow key={index} classroom={classroom} />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default ClassroomInfoUpdatePage;
