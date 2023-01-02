import { Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router";

import "./Menu.css";
import { GoogleLogout } from "react-google-login";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import { AiFillHome, AiFillContacts } from "react-icons/ai";
import { SiFiles } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import {
  MdFactCheck,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Login from "../pages/Login";

interface MenuProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}
const Menu: React.FC<MenuProps> = ({ loginMetadata, loginfunction }) => {
  const location = useLocation();
  const clientId =
    "413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com";
  const logOut = () => {
    StorageService.Logout();
    loginfunction(new LoginMetadata("-1"));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const href = window.location.href;
  const arr = href.split("/");
  const active = arr.slice(-1)[0];

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className={sidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
      <div className="sidebar-top"></div>
      <div
        className={sidebarOpen ? "sidebar-top-icon-open" : "sidebar-top-icon"}
        onClick={handleSidebar}
      >
        {sidebarOpen ? (
          <MdKeyboardArrowLeft size="1.5em" />
        ) : (
          <MdOutlineKeyboardArrowRight size="1.5em" />
        )}
      </div>
      <nav>
        <ul>
          <Link to="/home" className="menuLink">
            <li className={active === "home" ? "active" : ""}>
              <span className="icon">
                <AiFillHome size="1.2em" />
              </span>
              <span className="nav-title">Home</span>
            </li>
          </Link>
          <Link to="/files" className="menuLink">
            <li className={active === "files" ? "active" : ""}>
              <span className="icon">
                <SiFiles size="1.2em" />
              </span>
              <span className="nav-title">Files</span>
            </li>
          </Link>
          <Link to="/about" className="menuLink">
            <li className={active === "about" ? "active" : ""}>
              <span className="icon">
                <MdFactCheck size="1.2em" />
              </span>
              <span className="nav-title">About</span>
            </li>
          </Link>
          <Link to="/contact" className="menuLink">
            <li className={active === "contact" ? "active" : ""}>
              <span className="icon">
                <AiFillContacts size="1.2em" />
              </span>
              <span className="nav-title">Contact</span>
            </li>
          </Link>
        </ul>
        {/* <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        /> */}
      </nav>
      <div className="logout">
        <FiLogOut /> <span>Logout</span>
      </div>
    </div>
  );
};

export default Menu;
