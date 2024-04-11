import "./index.css"
import {Component} from 'react'
import { googleLogout } from '@react-oauth/google';
import {Navigate} from 'react-router-dom'


class YTMCHome extends Component{

    onClickLogout = () => {
        googleLogout();
        console.log("Logged out successfully")
        window.location.href="/ytmclogin"
        // return <Navigate to="/ytmclogin" replace={true}/>
    }

    render(){
        return (
            <>
            <div className="ytmchome-main-container">
                <div className="ytmchome-top-container">
                    <div className="ytmchome-top-flex-container">
                    <h1>YTMC</h1>
                    <button onClick={this.onClickLogout} type="button" className="logoutBtn">Log Out</button>
                    </div>
                </div>
                <div className="ytmchome-flex-container1">
                
                <div className="ytmchome-left-container">
                    <ul className="ytmchome-list-container">
                        <li className="ytmchome-list-item">Report</li>
                        <li className="ytmchome-list-item">Reward</li>
                        <li className="ytmchome-list-item">Content</li>
                        <li className="ytmchome-list-item">Profile</li>
                    </ul>
                </div>
                <div className="ytmchome-content-container">
                    <h1>I am Main Container</h1>
                </div>
                </div>
            </div>
            <footer className="ytmchome-footer">
                <ul className="ytmchome-list-container2">
                    <li className="ytmchome-list-item2">Report</li>
                    <li className="ytmchome-list-item2">Reward</li>
                    <li className="ytmchome-list-item2">Content</li>
                    <li className="ytmchome-list-item2">Profile</li>
                </ul>
            </footer>
            </>
        )
    }
}

export default YTMCHome