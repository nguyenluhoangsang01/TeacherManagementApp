import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BG from "../../images/bg.png";
import LogoWBG from "../../images/logo-bg.png";

const Auth = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative">
      <div
        className="absolute inset-0 w-full h-[100vh] bg-cover bg-center -z-10 opacity-80"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      ></div>

      <div className="absolute">
        <img
          src={LogoWBG}
          alt="Logo"
          className="w-[40%] h-[40%] rounded-md ml-5 mt-5"
        />
      </div>

      <main className="z-10 bg-white p-8 rounded shadow-xl max-w-lg h-screen pt-36">
        <h1 className="text-center font-bold text-2xl mb-16">
          {pathname === "/auth/login"
            ? "Đăng nhập"
            : pathname === "/auth/forgot-password"
            ? "Thay đổi mật khẩu"
            : pathname === "/auth/register" && "Đăng ký"}
        </h1>

        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
