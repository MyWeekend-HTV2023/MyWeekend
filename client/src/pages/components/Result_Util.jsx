import '../styles/LocalResult.css'
import { Plan } from "./List";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

let num = 0;
var place = 'CN Tower, Toronto, ON';
function createCard(card){
        console.log(card);
        const container = document.createElement('div');
        const picture = document.createElement('img');
        const description = document.createElement('div');
        const name = document.createElement('div');
        const hours = document.createElement('div');
        const info = document.createElement('div');

        info.className = 'card-info';
        name.className = 'name';
        hours.className = 'time';
        description.className = 'description';

        picture.src = card.photo;

        name.innerHTML = card.name;
        hours.innerHTML = card.hours;
        description.innerHTML = card.description;

        info.append(name, description, hours);
        container.append(picture, info);
        picture.addEventListener('click', () => {
            document.getElementById('map').src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCAao5fwt_7o0UNWFHSsi6mMkljPpsHSdU&q=place_id:'+card.place_id;
        });


        container.className = 'card';
        return container;
}

function getPlaces(num){
    const itineraryID = new URLSearchParams(window.location.search).get("itineraryID");
    console.log(itineraryID);

    fetch('http://localhost:3000/api/itinerary?itineraryID='+itineraryID, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            console.log(num);
              const container = document.getElementById('list');
              const  list = document.createElement('ul');
              const  items = document.createElement('li');
              let days = 3;

              console.log(container);
              for(let card of data.places){
                if(days ==3){
                    document.getElementById('map').src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCAao5fwt_7o0UNWFHSsi6mMkljPpsHSdU&q='+card.name;
                }
                if(days % 3 == 0 && num == 0){
                    const div = document.createElement('div');
                    div.className = 'day';
                    div.innerHTML = 'Day ' + (days/3);
                    items.appendChild(div); 
                }
                items.appendChild(createCard(card));
                days++;
              }
                list.appendChild(items);
                if(num==0){
                    container.appendChild(list);
                }
          });
        } else {
          alert("Something went wrong");
          navigate('/');
        }
    }).catch((error) => { console.log(error); });

}

function Navigation(){

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    getPlaces(num++);
    
    return(<>
        <div className="navigation">
            <div className="container">
                <img src={logo} alt="" onClick={navigateToHome} />
                <div className="title" id='title'>itinerary</div>
            </div>
            <div className="list" id='list'>
            </div>
            
        </div>
    </>)
}


function Map(){
    return(<>
        <div className="map-holder">
            <iframe id="map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCAao5fwt_7o0UNWFHSsi6mMkljPpsHSdU
                    &q=CN Tower,Toronto ON" className='map'>
            </iframe>
        </div>
    </>)

}


export {Map, Navigation}