import '../styles/LocalResult.css'
import { Plan } from "./List";

function Navigation(){
    return(<>
        <div className="navigation">
            <div className="container">
                <div className="title">Itinerary Plan</div>

               
            </div>
            <div className="list">
                <Plan data={{"1": [{"name":"ur dad", "description": "nice"},{"name":"ur mom", "description":"cool"}],"2": [{"name":"ur brother", "description": "wow"},{"name":"ur sister", "description":"woah"}]}} />
            </div>
            
        </div>
    </>)
}


function Map(){
    return(<>
        <div className="map">

        </div>
    </>)

}

export {Map, Navigation}