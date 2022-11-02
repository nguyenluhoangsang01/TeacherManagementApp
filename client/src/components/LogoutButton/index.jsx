import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutReducer } from "../../features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutReducer());

    return navigate("/auth/login", { replace: true });
  };

  return (
    <button type="button" onClick={handleLogout}>
      Thoát
    </button>
  );
};

export default LogoutButton;
