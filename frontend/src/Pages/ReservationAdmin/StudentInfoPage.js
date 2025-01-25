import React, { useState } from "react";
import "../css/Pages.css";
import "./css/studentInfoUpdate.css";
import StudentRow from "../../Components/ReservationAdmin/StudentRow";

import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";

const StudentInfoPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const studentInfo = [
    {
      id: "2022123456",
      department: "정보융합학부",
      name: "김가연",
      number: "010-1234-5678",
    },
    {
      id: "2022123456",
      department: "정보융합학부",
      name: "박서현",
      number: "010-1234-5678",
    },
    {
      id: "2022123456",
      department: "정보융합학부",
      name: "정유빈",
      number: "010-1234-5678",
    },
    {
      id: "2022123456",
      department: "정보융합학부",
      name: "손아현",
      number: "010-1234-5678",
    },
  ];

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="student-info-update__header">
          <h1 className="student-info-update__title">학생 정보 업데이트</h1>
          <button className="student-info-update__action-button">등록</button>
          <button className="student-info-update__action-button">삭제</button>
        </header>

        <main className="student-info-update__main">
          <table className="student-info-update__table">
            <tbody>
              {studentInfo.map((students, index) => (
                <StudentRow key={index} students={students} />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default StudentInfoPage;
