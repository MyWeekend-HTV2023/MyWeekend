import '../styles/LocalResult.css'
import { Plan } from "./List";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

function Navigation(){
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    return(<>
        <div className="navigation">
            <div className="container">
                <img src={logo} alt="" onClick={navigateToHome} />
                <div className="title">itinerary</div>
               
            </div>
            <div className="list">
                <Plan data={{"1": [{"name":"ur dad", "description": "nice"},{"name":"ur mom", "description":"cool"}],"2": [{"name":"ur brother", "description": "wow"},{"name":"ur sister", "description":"woah"}]}} />
            </div>
            
        </div>
    </>)
}


function Map(){
    return(<>
        <div className="map-holder">
            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCAao5fwt_7o0UNWFHSsi6mMkljPpsHSdU
                    &q=CN+Tower,Toronto+ON" className='map'>
            </iframe>
        </div>
    </>)

}

export {Map, Navigation}