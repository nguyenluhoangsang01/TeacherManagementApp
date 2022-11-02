import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import { selectAuth } from "../../features/auth/authSlice";
import { LOCAL_STORAGE_AUTH_KEY } from "../../utils/constants";

const Default = () => {
  const { user } = useSelector(selectAuth);
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  if (!auth && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Default;
