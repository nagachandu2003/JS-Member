import "./index.css"


const YTMCChannelItem = (props) => {
    const {itemDetails} = props
    const {channelName} = itemDetails
    const url = `https://www.youtube.com/@${channelName}` 
    return (
        <li className="ytmcchannel-list-item">
            <h3>{channelName}</h3>
            <div className="ytmcchannel-link-btn">
            <a href={url} target="_blank" rel="noreferrer">Link</a>
            <button type="button" className="fetch-Btn">View</button>
            </div>
        </li>
    )
}

export default YTMCChannelItem