import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import ClassroomInfoPage from "./Pages/ReservationAdmin/ClassroomInfoPage";
import RoomReservationStatusPage from "./Pages/ReservationAdmin/RoomReservationStatusPage";
import StudentInfoPage from "./Pages/ReservationAdmin/StudentInfoPage";
import NoticePage from "./Pages/NoticeAdmin/NoticePage ";
import ClassInfoPage from "./Pages/ReservationAdmin/ClassInfoPage";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Reservation" element={<RoomReservationStatusPage />} />
        <Route path="/Classroom" element={<ClassroomInfoPage />} />
        <Route path="/Student" element={<StudentInfoPage />} />
        <Route path="/Class" element={<ClassInfoPage />} />
        <Route path="/Notice" element={<NoticePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Find-password" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
