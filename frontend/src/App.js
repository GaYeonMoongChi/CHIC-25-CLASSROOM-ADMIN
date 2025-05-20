import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import ClassroomInfoPage from "./Pages/ReservationAdmin/ClassroomInfoPage";
import ReservationStatusPage from "./Pages/ReservationAdmin/ReservationStatusPage";
import NoticePage from "./Pages/NoticeAdmin/NoticePage ";
import ClassInfoPage from "./Pages/ReservationAdmin/ClassInfoPage";
import Signup from "./Pages/Signup";
import FindPassword from "./Pages/FindPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Reservation" element={<ReservationStatusPage />} />
        <Route path="/Classroom" element={<ClassroomInfoPage />} />
        <Route path="/Class" element={<ClassInfoPage />} />
        <Route path="/Notice" element={<NoticePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Find-password" element={<FindPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
