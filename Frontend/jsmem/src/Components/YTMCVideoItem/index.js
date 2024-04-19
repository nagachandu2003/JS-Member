import "./index.css"


const YTMCVideoItem = (props) => {
    const {itemDetails} = props
    const {videoUrl,videoId,videoName,views} = itemDetails
    // const url = `https://www.youtube.com/watch?v=${videoId}`
    return (
        <li className="ytmcchannel-list-item">
            <h3>{videoName}</h3>
            <div className="ytmcchannel-link-btn" style={{display:'flex',alignItems:'center'}}>
            <a href={videoUrl} target="_blank" rel="noreferrer">Link</a>
            <p>Views : {views}</p>
            </div>
        </li>
    )
}

export default YTMCVideoItem