import '../styles/Taskbar.css'
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


export default Taskbar;