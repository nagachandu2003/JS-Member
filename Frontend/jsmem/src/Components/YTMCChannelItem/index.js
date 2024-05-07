import "./index.css"
import {Link} from 'react-router-dom'

const YTMCChannelItem = (props) => {
    const {itemDetails} = props
    const {channelName,channelDate} = itemDetails
    const url = `https://www.youtube.com/@${channelName}` 
    return (
        <li className="ytmcchannel-list-item">
            <div className="list-item-cont">
            <img className="user-img" src="https://imgs.search.brave.com/mVZUg9yLtbGziLSE-n97XJJN60bZQoIZN199kEK-RIE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMzg0LzEzODQw/NjAucG5n" alt="img" />
            <div style={{textAlign:'left'}}>
            <a style={{textDecoration:'none', color:'black'}} href={url} target="_blank" rel="noreferrer"><h3>{channelName}</h3></a>
            <div style={{display:'flex'}}>
            <p>{(new Date()).toLocaleDateString()}</p>
            <Link to={`/ytmcvideo/${channelName}`}>
            <button type="button" className="view-Btn">View</button>
            </Link>
            </div>
            </div>
            </div>
        </li>
    )
}

export default YTMCChannelItem