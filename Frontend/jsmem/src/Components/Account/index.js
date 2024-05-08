import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter'
import { FaArrowLeft } from 'react-icons/fa';
import "./index.css"

const Account = () => {
  const [userDetails,setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      const email = Cookies.get("useremail");
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/users`);
        const data = await response.json();
        const newUser = data.filter((ele) => ele.email===email)[0]
        setUserDetails(newUser)
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


  const onClickLogout = () => {
    googleLogout();
    console.log('Logged out successfully');
    window.location.href = '/ytmclogin';
  };

  return (
    <>
      <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <div style={{display:'flex',alignItems:'center'}}>
                <Link to="/profile" style={{textDecoration:'none'}}>
                <FaArrowLeft style={{height:'30px',width:'30px'}}/>
                </Link>
            <h2>Account</h2>
            </div>
          </div>
        </div>
          {isLoading===true && (
                    <div className="ytmchome-content-container">
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div className="ytmchome-content-container">
            <div className='profile-cont'>
                <img className='user-img' alt="logo" src="https://res.cloudinary.com/dylh46szw/image/upload/v1715170612/download_1_zghzgi.png"/>
                 <h4 className='hrline'>{userDetails.name}</h4>
                <h4 className='hrline'>{userDetails.email}</h4>
                <h4 className='hrline'>{userDetails.whatsappNumber}</h4> 
                <h4 className='hrline'>{userDetails.channelUrl}</h4>
                <h4 className='hrline'>{userDetails.state}</h4>
                <h4 className='hrline'>{userDetails.district}</h4>
                <h4 className='hrline'>{userDetails.constituency}</h4>
                <button onClick={onClickLogout} type="button" className="logoutBtn">
              Log Out
            </button>
            </div>
          </div>
          )}
        </div>
      <Footer/>
    </>
  );
};

export default Account;

