import '../styles/Landing.css'
import { useNavigate } from "react-router-dom";

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
        <div className="container">
            <div className="info">
                <img src="/worldwide.png"/>
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
            
            </div>
            <div className="cards"></div>
        </div>
    </>)
}

export {Taskbar, Body, Info}