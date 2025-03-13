import { Link } from "react-router-dom";
import "../css/sidebar.css";
import { useEffect } from "react";
import LogoutButton from "../LogoutButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
  }, [isOpen]);

  const links = [
    {
      id: "reservation-status-link",
      to: "/Reservation",
      text: "강의실 예약현황 열람",
    },
    {
      id: "classroom-update-link",
      to: "/Classroom",
      text: "강의실 정보 열람",
    },
    {
      id: "student-update-link",
      to: "/Student",
      text: "학생 정보 열람",
    },
    {
      id: "class-update-link",
      to: "/Class",
      text: "강의 정보 열람",
    },
  ];

  return (
    <div>
      <button
        className={`sidebar-toggle-btn ${isOpen ? "hidden" : ""}`}
        onClick={toggleSidebar}
        aria-label="사이드바 열기"
      >
        ☰
      </button>

      <div
        className={`sidebar-container ${isOpen ? "open" : "closed"}`}
        onClick={toggleSidebar}
      >
        <aside
          id="sidebar"
          className="sidebar"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleSidebar}
            className="sidebar-close"
            aria-label="사이드바 닫기"
          >
            X 닫기
          </button>
          <ul id="sidebar-links" className="sidebar-links">
            {links.map((link) => (
              <li key={link.id} className="sidebar-links__item">
                <Link id={link.id} to={link.to}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          <LogoutButton />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
