import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./index.css";
import { MdFlag } from 'react-icons/md';
import { RiGiftFill } from 'react-icons/ri';
import { IoDocumentText } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

const YTCMFooter = () => {
  const [activeTab, setActiveTab] = useState('Report'); // Initially set to 'Report'

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleIconClick = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  return (
    <div className='footer-container'>
      <nav className='bottom-tabs-container'>
        <Link to="/ytmchome" className={`bottom-tab ${activeTab === 'Report' ? 'active' : ''}`} onClick={() => handleClick('Report')}><MdFlag className={`tab-icon ${activeTab === 'Report' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Report')} /> Report</Link>
        <Link to="/reward" className={`bottom-tab ${activeTab === 'Trainings' ? 'active' : ''}`} onClick={() => handleClick('Trainings')}><RiGiftFill className={`tab-icon ${activeTab === 'Trainings' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Trainings')} /> Reward</Link>
        <Link to="/content" className={`bottom-tab ${activeTab === 'Task' ? 'active' : ''}`} onClick={() => handleClick('Task')}><IoDocumentText className={`tab-icon ${activeTab === 'Task' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Task')} /> Content</Link>
        <Link to="/profile" className={`bottom-tab ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => handleClick('Profile')}><FaUserCircle className={`tab-icon ${activeTab === 'Profile' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Profile')} /> Profile</Link>
      </nav>
    </div>
  );
};

export default YTCMFooter;
