import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [redirect, setRedirect] = useState(false);
  const alertShownRef = useRef(false);

  useEffect(() => {
    if (token && !alertShownRef.current) {
      alertShownRef.current = true;
      setTimeout(() => {
        alert("로그아웃을 해주세요!");
        setRedirect(true);
      }, 0);
    }
  }, [token]);

  if (token && redirect) {
    return <Navigate to="/reservation" replace />;
  }

  return !token ? children : null;
};

export default PublicOnlyRoute;
