import "./index.css"
import {Link} from 'react-router-dom'

const Home = () => (
    <div className="outer-cont1">
        <div className="inner-cont1">
            <div>
                <img className="home-img" src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" alt="logo"/>
                <h1 className="main-heading1">JS MEMBER</h1>
            </div>
            <div>
                <Link to="/camplogin">
                <div className="Camps">
                    <h1>Camps</h1>
                </div>
                </Link>
            </div>
        </div>
    </div>
    )

export default Home 