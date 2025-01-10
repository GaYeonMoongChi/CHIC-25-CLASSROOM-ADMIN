import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLoginPage from "./Pages/ReservationAdmin/AdminLoginPage";
import ClassroomInfoUpdatePage from "./Pages/ReservationAdmin/ClassroomInfoUpdatePage";
import RoomReservationStatus from "./Pages/ReservationAdmin/RoomReservationStatus ";
import StudentInfoUpdate from "./Pages/ReservationAdmin/StudentInfoUpdate ";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/Home" element={<RoomReservationStatus />} />
        <Route path="/Update/Classroom" element={<ClassroomInfoUpdatePage />} />
        <Route path="/Update/Student" element={<StudentInfoUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
