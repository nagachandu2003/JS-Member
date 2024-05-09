import React, { useState,useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../YTCMFooter'
import Cookies from 'js-cookie'

import './index.css'; // Import CSS file

const Content = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      const email = Cookies.get("useremail");
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/content/${email}`);
        const data = await response.json();
        setUsers(data.Content)
        setIsLoading(false)
        // Update videosList state with the fetched data
        // setVideosList(data.videos); // Assuming the response structure has a 'videos' property
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount

  // useEffect(() => {
  //   const getContent = async () => {
  //     const email = Cookies.get("useremail");
  //     try {
  //       const response = await fetch(`https://js-member-backend.vercel.app/content/${email}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUsers(data.Content);
  //       }
  //     } catch (error) {
  //       console.log(`Error Occurred : ${error}`);
  //     }
  //   };
  
  //   getContent(); // Call getContent directly inside useEffect
  
  // }, [users]); // Empty array as the second argument to useEffect
  

  // useEffect(() => {
  //   const getContent = async () => {
  //     const email = Cookies.get("useremail");
  //     try{
  //       const response = await fetch(`https://js-member-backend.vercel.app/content/${email}`)
  //       if(response.ok)
  //       {
  //         const data = await response.json()
  //         setUsers(data.Content)
  //       }
  //     }
  //     catch(Err)
  //     {
  //       console.log(`Error Occurred : ${Err}`)
  //     }
  //   }
  //   getContent()
  // })

  const onAddContent = async (obj) => {
    const email = Cookies.get("useremail");
    try{
      const options = {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({email,obj})
      }
      const response = await fetch(`https://js-member-backend.vercel.app/addcontent`,options);
      if(response.ok)
        {
          const data = await response.json();
          console.log(data);
        }
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`);
    }
  }

  const handleSave = (userData) => {
    if (userData) {
      const defaultName = `Content${users.length + 1}`;
      const d2dName = { ...userData, name: defaultName };
      onAddContent(d2dName)
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
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        heading,
        source,
        state,
        date,
        type,
        link,
        time: currentTime
      });
      // Reset input fields after submission
      setHeading('');
      setSource('');
      setState('');
      setDate('');
      setType('');
      setLink('');
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
            <label htmlFor="link" className="form-label">Add Link:</label>
            <input
              type="text"
              id="link"
              className="form-input"
              placeholder="Enter Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
            <select
              id="state"
              className="form-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
