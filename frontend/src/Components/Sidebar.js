import { Link } from "react-router-dom";
import "./css/sidebar.css";
import { useEffect } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
  }, [isOpen]);

  const links = [
    {
      id: "reservation-status-link",
      to: "/reservation",
      text: "강의실 예약현황 관리",
    },
    {
      id: "classroom-update-link",
      to: "/classroom",
      text: "강의실 정보 관리",
    },
    {
      id: "class-update-link",
      to: "/class",
      text: "강의 정보 관리",
    },
    {
      id: "notice-page-link",
      to: "/notice",
      text: "공지글 관리",
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
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
