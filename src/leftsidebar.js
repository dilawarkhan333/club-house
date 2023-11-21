import React from 'react';
import './leftsidebar.css'; // Include CSS for styling (create this file)
import User from './Assets/User.png'
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { MdFeed } from "react-icons/md";
import { FaChevronCircleDown } from "react-icons/fa";
const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      {/* User Profile */}
      <div className="profile">
        <img
          src={User}
          alt="Profile"
          className="profile-pic"
        />
        <span className="user-name">Merry Jhonson</span>
      </div>


      {/* Explore Section */}
      <div className="explore">

    
        <a href="#"><p> <RiUser3Fill/> </p> <b>Pages</b></a>
        <a href="#"><p><FaClock /></p> <b>Memories</b></a>
        <a href="#"><p><FaBookmark /></p><b> Saved</b></a>
        <a href="#"><p><MdGroups/></p><b>Groups</b></a>
        <a href="#"><p><MdOutlineSlowMotionVideo/></p><b>Video</b></a>
        <a href="#"><p><MdOutlineCalendarViewMonth/></p><b>Events</b></a>
        <a href="#"><p><MdFeed/></p><b>Feeds</b></a>
        <a href="#"><p><FaChevronCircleDown/></p><b>See More</b></a>
                {/* Add more explore links */}
      </div>

      {/* Other functionalities */}
      {/* Add more sections like saved items, games, etc. */}
    </div>
    
  );
};

export default LeftSidebar;
