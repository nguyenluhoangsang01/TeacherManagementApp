import React from "react";
import banner from "../../images/banner.jpg";

const Header = () => {
  return (
    <header>
      <div>
        <img src={banner} alt="banner" className="w-full h-full" />
      </div>
    </header>
  );
};

export default Header;
