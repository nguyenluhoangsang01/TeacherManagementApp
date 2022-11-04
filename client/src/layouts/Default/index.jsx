import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import { selectAuth } from "../../features/auth/authSlice";

const Default = () => {
  const { user } = useSelector(selectAuth);

  if (!user) {
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
