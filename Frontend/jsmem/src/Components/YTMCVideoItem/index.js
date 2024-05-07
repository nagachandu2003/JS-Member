import "./index.css"
import {Link} from 'react-router-dom'

const YTMCVideoItem = (props) => {
    const {itemDetails} = props
    const {videoUrl,videoId,videoName,views,videoDate,channelTitle} = itemDetails
    // const url = `https://www.youtube.com/watch?v=${videoId}`
    return (
        <li className="ytmcchannel-list-item">
            <div className="list-item-cont">
            <img className="user-img" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="thumbnail"/>
            <div>
            <h5>{videoName}</h5>
            <p>Added Date : {videoDate}</p>
            <div className="ytmcchannel-link-btn" style={{display:'flex',alignItems:'center'}}>
            <a href={videoUrl} target="_blank" rel="noreferrer">Link</a>
            {/* <p>Views : {views}</p> */}
            <Link to={`/ytmcvideo/videoinfo/${channelTitle}/${videoId}`}>
            <button type="button" className="add-Btn">View More</button>
            </Link>
            </div>
            </div>
            </div>
        </li>
    )
}

export default YTMCVideoItem