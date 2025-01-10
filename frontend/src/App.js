import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLoginPage from "./Pages/AdminLoginPage";
import ClassroomInfoUpdatePage from "./Pages/ReservationAdmin/ClassroomInfoUpdatePage";
import RoomReservationStatus from "./Pages/ReservationAdmin/RoomReservationStatus ";
import StudentInfoUpdate from "./Pages/ReservationAdmin/StudentInfoUpdate ";
import NoticePage from "./Pages/NoticeAdmin/NoticePage ";
import AdvertisingPage from "./Pages/NoticeAdmin/AdvertisingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/Home/Reservation" element={<RoomReservationStatus />} />
        <Route path="/Update/Classroom" element={<ClassroomInfoUpdatePage />} />
        <Route path="/Update/Student" element={<StudentInfoUpdate />} />
        <Route path="/Home/Notice" element={<NoticePage />} />
        <Route path="/Home/Advertising" element={<AdvertisingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
