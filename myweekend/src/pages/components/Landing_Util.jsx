
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
    const navigate = useNavigate();

    const navigateToLocal = () => {
        navigate('/local');
    };
    const navigateToAbroad = () => {
        navigate('/abroad');
    };
    return(<>

        <div className="information-container">
            <div className="text">
                We leverage the power of AI to curate personalized travel experiences.
            </div>
            <div className="holder">
                <div className="card">
                    Build itinerary based on your preferences.
                </div>
                <div className="card">
                    Save your favourite places and events.
                </div>
                <div className="card">
                    Share your itinerary with friends and family.
                </div>
            </div>
            <div className="button-container">
                <button onClick={navigateToLocal}>Local Trip</button>
                <button onClick={navigateToAbroad}>Abroad Trip</button>
            </div>
        </div>
    </>)
}

export {Taskbar, Body, Info}