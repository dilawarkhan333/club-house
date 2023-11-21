
import React from 'react';
import './Header.css'; // Include CSS for styling (create this file)
import weblogo from './Assets/weblogo.png'
import { FaHome } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { GiAchievement } from "react-icons/gi";
import { RiUser3Fill } from "react-icons/ri";
import { RiMessage2Line } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
const Header = () => {
  return (
    <div className="header">
      {/* Facebook Logo */}
      <div className="logo">
        <img
          src={weblogo}   alt=""
        />
      </div>

      {/* Search Bar */}
      {/* <div className="search">
        <input type="text" placeholder="Search Facebook" />
      </div> */}

      {/* Navigation Icons */}
      <div className="navigation-icons">
        {/* Include icons for navigation (e.g., Home, Friends, Messages, etc.) */}
        {/* Example icons: */}
        <i className="fas fa-home"><FaHome /></i>
        <i className="fas fa-user-friends"><PiVideoFill /></i>
        <i className="fas fa-comment-alt"> <GiAchievement /></i>
        <i className="fas fa-comment-alt"> <RiUser3Fill  /></i>
        {/* Add more icons for different functionalities */}
      </div>

      {/* User Profile Section */}
      <div className="profile">
      
     <b  ><RiMessage2Line /></b>
      <b><MdNotificationsActive /></b>
      <b> <IoSettingsOutline /></b>
        {/* <img
          src="https://via.placeholder.com/30"
          alt="Profile"
          className="profile-pic"
        />
        <span className="user-name">John Doe</span> */}
      </div>
    </div>
  );
};

export default Header;
