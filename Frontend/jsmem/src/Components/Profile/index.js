import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { Popup } from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import YTMCVideoItem from '../YTMCVideoItem';
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter'
import "./index.css"

const Profile = () => {
  const { channelName } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cname = channelName;
  console.log(cname)

  // useEffect(() => {
  //   const getVideos = async () => {
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ email: Cookies.get("useremail"), channelName: cname })
  //     };

  //     try {
  //       const response = await fetch(`https://js-member-backend.vercel.app/users/videosdetails`, options);
  //       const data = await response.json();
  //       console.log(data);
  //       // Update videosList state with the fetched data
  //       // setVideosList(data.videos); // Assuming the response structure has a 'videos' property
  //     } catch (error) {
  //       console.error("Error fetching videos:", error);
  //     }
  //   };

  //   // Call getVideos only once on mount
  //   getVideos();
  // }, [videosList]); // Empty dependency array means it runs only once on mount


//   useEffect(() => {
//     // Code that would run on component mount
//     const getVideos = async () => {
//       setIsLoading(true);
//       try{
//         const email = Cookies.get("useremail")
//         const options  = {
//           method : "POST",
//           headers : {
//             "Content-Type" : "application/json"
//           },
//           body : JSON.stringify({email:Cookies.get("useremail"),channelName:cname})
//         }
//         const response = await fetch(`https://js-member-backend.vercel.app/users/videosdetails`,options);
//         if(response.ok===true){
//         const data = await response.json()
//         // console.log(data)
//         if(data.Videos!==undefined){
//         // const li = data.Videos.map((ele) => JSON.parse(ele))
//         setVideosList(data.Videos)
//         setIsLoading(false)
//         }
//         }
//       }
//       catch(Err){
//         console.log(`Error Occurred : ${Err}`)
//       }
//     }
//     // Example: getVideos();
//     getVideos()
//   }, []); // Empty dependency array means it runs only once on mount


  const onClickLogout = () => {
    googleLogout();
    console.log('Logged out successfully');
    window.location.href = '/ytmclogin';
  };

  // console.log("Videos : " + videosList)

  return (
    <>
      <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <h1>YTMC</h1>
            <button onClick={onClickLogout} type="button" className="logoutBtn">
              Log Out
            </button>
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
                <img className='user-img' alt="logo" src="https://img.freepik.com/free-photo/user-sign-icon-front-side-with-white-background_187299-40022.jpg?t=st=1715095284~exp=1715098884~hmac=92c68e9eafab4838a86093b85e672fc20a9889a2f7435c4865c287db6e82a6a8&w=740"/>
                <h4>Username : Vijay</h4>
                <h4>State : Bihar</h4>
                <h4>District : PASCHIM CHAMPARAN</h4>
                <h4>Constituency : Nirmali</h4>
                <h4>Whatsapp Number : +919393929392</h4>
                </div>
            
          </div>
          )}
        </div>
      <Footer/>
    </>
  );
};

export default Profile;

