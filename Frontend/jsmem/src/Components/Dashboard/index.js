import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./index.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FcManager } from "react-icons/fc";
import { MdHelpCenter } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";



const Dashboard = ({ studentDetails, updateStudentDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropDown = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
    setIsOpen(!isOpen);
  }

  return (
    <div className='left-section-container'>
      <div className='left-section'>

      <div className='student-card'>
          <div className='student-details-card'>
          <p className='users-dashboard-heading'>JS Member</p>
          <p className='users-heading'>VIJAY</p>
          </div>
        </div>

    
        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <FaHome className='option-logo'/>
              <p className='left-options-text'>Home</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('home')}>
              {isOpen && selectedOption === 'home' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'home' && (
              <div className="dropdown-content">
                <Link to="/about" className='sidebar-options'>About</Link>
                <Link to="/vision" className='sidebar-options'>Vision</Link>
                <Link to="/mission" className='sidebar-options'>Mission</Link>
              </div>
            )}
        </div>

        {/* <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <FaYoutube className='option-logo'/>
              <p className='left-options-text'>Youtube</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('users')}>
              {isOpen && selectedOption === 'users' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'users' && (
              <div className="dropdown-content">
               <Link to="/stats" className='sidebar-options'>Stats</Link>
              <Link to="/ytcm" className='sidebar-options'>YTCM</Link>
              <Link to="/reports" className='sidebar-options'>Reports</Link>
              <Link to="/rewards" className='sidebar-options'>Rewards</Link>
              <Link to="/tickets" className='sidebar-options'>Tickets</Link>
              </div>
            )}
        </div> */}

        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <HiMiniUserGroup className='option-logo'/>
              <p className='left-options-text'>Camps</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('staff')}>
              {isOpen && selectedOption === 'staff' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'staff' && (
              <div className="dropdown-content">
               <Link to="/stats" className='sidebar-options'>Stats</Link>
              <Link to="/members" className='sidebar-options'>Members</Link>
              <Link to="/attendance" className='sidebar-options'>Attendance</Link>
              <Link to="/d2dreport" className='sidebar-options'>D2D</Link>
              <Link to="/collaterals" className='sidebar-options'>Collaterals</Link>
              <Link to="/transport" className='sidebar-options'>Transport</Link>
              <Link to="/kitchen" className='sidebar-options'>Kitchen</Link>
              <Link to="/request" className='sidebar-options'>Request</Link>
              <Link to="/management" className='sidebar-options'>Management</Link>
              <Link to="/profile" className='sidebar-options'>Profile</Link>
              </div>
            )}
        </div>

        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <MdHelpCenter className='option-logo'/>
              <p className='left-options-text'>Help</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('help')}>
              {isOpen && selectedOption === 'help' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'help' && (
              <div className="dropdown-content">
                <Link to="/faqs" className='sidebar-options'>FAQ's</Link>
                <Link to="/trainings" className='sidebar-options'>Trainings</Link>
                <Link to="/feedback" className='sidebar-options'>Feedback</Link>
              </div>
            )}
        </div>

        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <FaThumbsUp className='option-logo'/>
              <p className='left-options-text'>Support</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('support')}>
              {isOpen && selectedOption === 'support' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'support' && (
              <div className="dropdown-content">
                  <Link to="/contact" className='sidebar-options'>Contact</Link>
                  <Link to="/request" className='sidebar-options'>Ticket</Link>
                  <Link to="/report" className='sidebar-options'>Chat</Link>
              </div>
            )}
        </div>

        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <IoSettingsSharp className='option-logo'/>
              <p className='left-options-text'>Settings</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('settings')}>
              {isOpen && selectedOption === 'settings' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'settings' && (
              <div className="dropdown-content">
                <Link to = "/edit" className='sidebar-options'>Profile</Link>
                <Link to = "/logout" className='sidebar-options'>Account</Link>
              </div>
            )}
        </div>

        <div className='left-options'>
          <div className='left-options-container'>
            <div className='two-options'>
              <FcManager className='option-logo'/>
              <p className='left-options-text'>Admin</p>
            </div>
            <button className='down-button' onClick={() => toggleDropDown('admin')}>
              {isOpen && selectedOption === 'admin' ? <RiArrowDropUpLine className='down-symbol'/> : <RiArrowDropDownLine className='down-symbol'/>}
            </button>
            </div>
            {isOpen && selectedOption === 'admin' && (
              <div className="dropdown-content">
                  <Link to = "/edit" className='sidebar-options'>Account</Link>
                  <Link to = "/edit" className='sidebar-options'>Sub Admins</Link>
                  <Link to = "/edit" className='sidebar-options'>Logs</Link>
              </div>
            )}
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
