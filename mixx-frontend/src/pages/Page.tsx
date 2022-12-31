import React, { useState } from "react";
import { AiFillHome, AiFillContacts } from "react-icons/ai";
import { SiFiles } from "react-icons/si";
import "./Page.css";
import {
  MdFactCheck,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import { useLocation } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

interface PageProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}

const Page: React.FC<PageProps> = ({ loginMetadata, loginfunction }) => {
  const location = useLocation();
  const clientId =
    "413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com";
  const logOut = () => {
    StorageService.Logout();
    loginfunction(new LoginMetadata("-1"));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container1">
      <div className={sidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-top"></div>
        <div className="sidebar-top-icon" onClick={handleSidebar}>
          {sidebarOpen ? (
            <MdKeyboardArrowLeft size="1.5em" />
          ) : (
            <MdOutlineKeyboardArrowRight size="1.5em" />
          )}
        </div>
        <nav>
          <ul>
            <li>
              <span className="icon">
                <AiFillHome size="1.2em" />
              </span>
              <span className="nav-title">Home</span>
            </li>
            <li>
              <span className="icon">
                <SiFiles size="1.2em" />
              </span>
              <span className="nav-title">Files</span>
            </li>
            <li>
              <span className="icon">
                <MdFactCheck size="1.2em" />
              </span>
              <span className="nav-title">About</span>
            </li>
            <li>
              <span className="icon">
                <AiFillContacts size="1.2em" />
              </span>
              <span className="nav-title">Contact</span>
            </li>
          </ul>
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </nav>
      </div>
      <div className="main"></div>
    </div>
  );
};

export default Page;
