// import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from "./Components/Home"
import Login from './Components/Login'
import ReactContext from './ReactContext';
import Cookies from 'js-cookie'
import Camps from './Components/Camps'
import Stats from './Components/Stats'
import Support from './Components/Support'
import ComingSoon from './Components/ComingSoon';
import D2DReport from './Components/D2DReport';

class App extends Component {
  state = {isLogin:'false'}

  changeLoginStatus = () => {
    const {isLogin} = this.state
    const token = Cookies.get("jwt_token2")
    if(isLogin==='false')
    this.setState({isLogin:'true'})
  }
  render(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/camps" element={<Camps/>}/>
        <Route exact path="/stats" element={<Stats/>}/>
        <Route exact path="/comingsoon" element={<ComingSoon/>}/>
        {/* <Route exact path="/ytmc" element={<Ytmc/>}/> */}
        <Route exact path="/support" element={<Support/>}/>
        <Route exact path="/d2dreport" element={<D2DReport/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
