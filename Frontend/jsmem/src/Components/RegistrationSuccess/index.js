import "./index.css"
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const RegistrationSuccess = () => {

    const navigate = useNavigate() 

    const onLogOut = () => {
        googleLogout();
        navigate("/")
    };

    return (
        <div style={{textAlign:'center'}} className="ytmcregister-form-container">
            <h1>Access Denied</h1>
        <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
    </div>
    )
}

export default RegistrationSuccess