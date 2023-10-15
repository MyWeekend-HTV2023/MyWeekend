
import { useNavigate } from "react-router-dom";

import '../styles/Landing.css'

import logo from '../../assets/logo.png'
function Taskbar(){
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };
    const navigateToDashboard = () => {
        navigate('/dashboard');
    };
    const navigateToSignup = () => {
        navigate('/signup');
    };
    return(
        <div className="taskbar">
            <div className="info">
                <img src={logo}/>
                <div className="title">MyWeekend</div>
            </div>
            <div className="buttons">
                <button onClick={navigateToDashboard}>Dashboard</button>
                <button onClick={navigateToSignup}>Sign Up</button>
                <button onClick={navigateToLogin}>Login</button>
            </div>
        </div>
    )
}

function Body(){
    return(<>
    <div className="welcome">
        <div className="title">Welcome To <span>MyWeekend</span></div>
        <img src="/worldwide.png" alt="" />
    </div>
    
    </>)
}

function Info(){
    return(<>
        <div className="information">
            <div className="text">
            At MyWeekend, we leverage the power of AI to curate personalized travel experiences. By understanding your 
            interests, we craft custom itinerary plans that ensure every trip is unique and unforgettable. Say goodbye to 
            generic travel recommendations; say hello to tailored adventures designed just for you.
            </div>
            <div className="cards"></div>
        </div>
    </>)
}

export {Taskbar, Body, Info}