import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import ClassroomInfoPage from "./Pages/ReservationAdmin/ClassroomInfoPage";
import RoomReservationStatusPage from "./Pages/ReservationAdmin/RoomReservationStatusPage";
import StudentInfoPage from "./Pages/ReservationAdmin/StudentInfoPage";
import NoticePage from "./Pages/NoticeAdmin/NoticePage ";
import AdvertisingPage from "./Pages/NoticeAdmin/AdvertisingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home/Reservation"
          element={<RoomReservationStatusPage />}
        />
        <Route path="/Update/Classroom" element={<ClassroomInfoPage />} />
        <Route path="/Update/Student" element={<StudentInfoPage />} />
        <Route path="/Home/Notice" element={<NoticePage />} />
        <Route path="/Home/Advertising" element={<AdvertisingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
