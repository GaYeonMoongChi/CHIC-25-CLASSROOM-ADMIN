import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FindPassword from "./Pages/FindPassword";

import ReservationStatusPage from "./Pages/ReservationAdmin/ReservationStatusPage";
import ClassroomInfoPage from "./Pages/ReservationAdmin/ClassroomInfoPage";
import ClassInfoPage from "./Pages/ReservationAdmin/ClassInfoPage";
import NoticePage from "./Pages/NoticeAdmin/NoticePage";

import ProtectedRoute from "./Components/route/ProtectedRoute";
import PublicOnlyRoute from "./Components/route/PublicOnlyRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 비로그인 사용자만 접근 가능 */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/find-password"
          element={
            <PublicOnlyRoute>
              <FindPassword />
            </PublicOnlyRoute>
          }
        />

        {/* 로그인한 사용자만 접근 가능 */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <ReservationStatusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <ClassroomInfoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class"
          element={
            <ProtectedRoute>
              <ClassInfoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notice"
          element={
            <ProtectedRoute>
              <NoticePage />
            </ProtectedRoute>
          }
        />

        {/* 잘못된 경로 → 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
