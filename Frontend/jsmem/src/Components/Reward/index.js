import React, { useState } from 'react';
import './index.css';
import { FaRegFileAlt } from 'react-icons/fa';
import { PiPresentationChartBold } from 'react-icons/pi';
import { FcReadingEbook } from 'react-icons/fc';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Footer from '../YTCMFooter';

const Reward = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTaskClick = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <>
      <header className="task-main-header-container">
        <h1 className="task-main-heading">Reward</h1>
      </header>
      <nav className="task-tabs-container">
        <div
          className={`task-tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => handleTabClick('current')}
        >
          Current
        </div>
        <div
          className={`task-tab ${activeTab === 'claimed' ? 'active' : ''}`}
          onClick={() => handleTabClick('claimed')}
        >
          Claimed
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'claimed' ? '50%' : '0' }} />
      </nav>
      <main className="task-content-container">
        {activeTab === 'current' && (
          <section>
            <h1>Current Rewards</h1>
            {/* Task items for current tab */}
            {/* Modify and structure task items here */}
          </section>
        )}
        {activeTab === 'claimed' && (
          <section>
            <h1>Claimed Rewards</h1>
            {/* Task items for claimed tab */}
            {/* Modify and structure claimed task items here */}
          </section>
        )}
      </main>
      {popupVisible && (
        <div className="task-popup">
          {/* Popup content */}
          {/* Modify and structure popup content here */}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Reward;
