import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../YTCMFooter'

import './index.css'; // Import CSS file

const Content = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index

  const handleSave = (userData) => {
    if (userData) {
      const defaultName = `Content${users.length + 1}`;
      const d2dName = { ...userData, name: defaultName };
      setUsers([...users, d2dName]);
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [heading, setHeading] = useState('');
    const [source, setSource] = useState('');
    const [state, setState] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        heading,
        source,
        state,
        date,
        type,
        time: currentTime
      });
      // Reset input fields after submission
      setHeading('');
      setSource('');
      setState('');
      setDate('');
      setType('');
    };
  
    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container2 active" style={{ overflow: 'auto' }}>
          <form className="d2d-form" onSubmit={handleSubmit}>
            <h1 className='popup-heading'>Content</h1>
            <label htmlFor="heading" className="form-label">Heading:</label>
            <input
              type="text"
              id="heading"
              className="form-input"
              placeholder="Enter Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
            <label htmlFor="source" className="form-label">Source:</label>
            <select
              id="source"
              className="form-input"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            >
              <option value="">Select Source</option>
              <option value="Telegram">Telegram</option>
              <option value="YouTube">YouTube</option>
            </select>
            <label htmlFor="state" className="form-label">State:</label>
            <input
              type="text"
              id="state"
              className="form-input"
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              id="date"
              className="form-input"
              placeholder="Enter Date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label htmlFor="type" className="form-label">Type:</label>
            <select
              id="type"
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
            <div className='cancel-submit-btn-container'>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Submit</button>
            </div>
          </form>
        </div>
        <Footer/>
      </>
    );
  };

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-d2d'>Content</h1>
        </div>
        <div className='d2d-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The Content List is Empty. Click on New to Add Content</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="d2d-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='d2d-list-column'>
                    <p className='list-d2d-name'>{user.name}</p>
                    <p className='list-d2d-time'>Date & Time: {user.time}</p>
                  </div>
                  <p><RiArrowRightSLine className='side-arrow' /></p>
                </li>
              ))
            )}
          </ul>
          {selectedItem !== null && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
                <ul className="userList">
                  <li className="users-list">
                    <p className='list-time'>Heading: {users[selectedItem].heading}</p>
                    <p className='list-time'>Date & Time: {users[selectedItem].time}</p>
                    <p className='list-time'>Source: {users[selectedItem].source}</p>
                    <p className='list-time'>State: {users[selectedItem].state}</p>
                    <p className='list-time'>Date: {users[selectedItem].date}</p>
                    <p className='list-time'>Type: {users[selectedItem].type}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
export default Content;
