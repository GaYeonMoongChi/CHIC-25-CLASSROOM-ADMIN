import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [redirect, setRedirect] = useState(false);
  const alertShownRef = useRef(false);

  useEffect(() => {
    if (!token && !alertShownRef.current) {
      alertShownRef.current = true;
      setTimeout(() => {
        alert("로그인을 해주세요!");
        setRedirect(true);
      }, 0);
    }
  }, [token]);

  if (!token && redirect) {
    return <Navigate to="/login" replace />;
  }

  return token ? children : null;
};

export default ProtectedRoute;
