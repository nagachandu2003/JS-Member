// import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import {ReactContext} from './ReactContext'
import Home from "./Components/Home"
import Login from './Components/Login'
import Cookies from 'js-cookie'
import Camps from './Components/Camps'
import Stats from './Components/Stats'
import Support from './Components/Support'
import ComingSoon from './Components/ComingSoon';
import D2DReport from './Components/D2DReport';
import Members from './Components/Members'
import Attendance from './Components/Attendance'
import YTMCLogin from './Components/YTMCLogin';
import YTMCHome from './Components/YTMCHome'
import YTMCRegister from './Components/YTMCRegister'
import YTMCVideo from './Components/YTMCVideo'
import YTMCVideoDetailItem from './Components/YTMCVideoDetailItem'
import RegistrationSuccess from './Components/RegistrationSuccess';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Reward from './Components/Reward'
import Content from './Components/Content'

class App extends Component {

  render(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/camps" element={<Camps/>}/>
        <Route exact path="/stats" element={<Stats/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/comingsoon" element={<ComingSoon/>}/>
        <Route exact path="/reward" element={<Reward/>}/>
        <Route exact path="/content" element={<Content/>}/>
        {/* <Route exact path="/ytmc" element={<Ytmc/>}/> */}
        <Route exact path="/ytmcregister" element={<YTMCRegister/>}/>
        <Route exact path="/ytmchome" element={<YTMCHome/>}/>
        <Route exact path="/ytmclogin" element={<YTMCLogin/>}/>
        <Route exact path="/attendance" element={<Attendance/>}/>
        <Route exact path="/support" element={<Support/>}/>
        <Route exact path="/d2dreport" element={<D2DReport/>}/>
        <Route exact path="/members" element={<Members/>}/>
        <Route exact path="/ytmcvideo/:channelName" element={<YTMCVideo/>}/>
        <Route exact path="/ytmcvideo/videoinfo/:channelName/:videoid" element={<YTMCVideoDetailItem/>}/>
        <Route exact path="/regpending" element={<RegistrationSuccess/>}/>
        {/* <Route path="*" element={<ComingSoon/>}/> */}
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
