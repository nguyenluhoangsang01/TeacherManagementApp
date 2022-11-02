import React from "react";
import { GiPositionMarker } from "react-icons/gi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#013668] text-white p-4 grid grid-cols-1 space-y-8 md:grid-cols-2 lg:grid-cols-3 md:space-x-4 md:space-y-4 lg:space-y-0 lg:space-x-8 pb-12 text-[14px]">
      <p>© Copyright 2020 vanlanguni.edu.vn. All rights reserved</p>

      <div className="divide-y-2 space-y-2">
        <p className="uppercase font-bold">LIÊN KẾT</p>

        <div className="flex flex-col pt-2 space-y-2">
          <Link to="/" className="text-[yellow] text-[12px]">
            Trang chủ
          </Link>
          <Link to="/teacher" className="text-[yellow] text-[12px]">
            Giảng viên
          </Link>
          <Link to="/schedule" className="text-[yellow] text-[12px]">
            Thời khóa biểu
          </Link>
        </div>
      </div>

      <div className="divide-y-2 space-y-2">
        <p className="uppercase font-bold">TRƯỜNG ĐẠI HỌC VĂN LANG</p>

        <div className="flex flex-col pt-2 space-y-2">
          <p className="text-[12px] flex items-center">
            <GiPositionMarker className="mr-1 text-[yellow] w-4 h-4" />
            Trụ sở: 45 Nguyễn Khắc Nhu, P. Cô Giang, Q.1, TP. HCM
          </p>
          <p className="text-[12px] flex items-center">
            <GiPositionMarker className="mr-1 text-[yellow] w-4 h-4" />
            Cơ sở 2: 233A Phan Văn Trị, P.11, Q. Bình Thạnh, TP. HCM
          </p>
          <p className="text-[12px] flex items-center">
            <GiPositionMarker className="mr-1 text-[yellow] w-4 h-4" />
            Cơ sở 3: 69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, TP. HCM
          </p>
          <p className="text-[12px] flex items-center">
            <GiPositionMarker className="mr-1 text-[yellow] w-4 h-4" />
            Ký túc xá: 160/63A-B Phan Huy Ích, P. 12, Q. Gò Vấp, TP. HCM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
