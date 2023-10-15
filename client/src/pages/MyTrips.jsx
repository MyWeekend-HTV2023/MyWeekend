import {React} from 'react'
import Typewriter from './components/Typewriter.jsx'
import logo from '../assets/logo.png'
import { getClient } from '../../../server/model/model.mjs';

function MyTrips() {
  const [itineraries, setItineraries] = useState([]);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/api/itineraries/')
    .then((res) => res.json())  
    .then((data) => {
        setItineraries(data.itineraries)
      })
    .catch((err) => {
        console.log(err.message);
      });

    fetch('http://localhost:3000/api/user')
    .then((res) => res.json())
    .then((data) => {
      setUsername(data.username);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }, []);
let filteredItineraries = [];
  useEffect(() => {
for (let i= 0; i<itineraries.length; i++) {
    console.log(itineraries[i].user_id);
    console.log(username);
    if (itineraries[i].user_id == username ) {
        filteredItineraries = [...filteredItineraries, itineraries[i]];
    }
  }

  }, [username])
  
  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-grow-0 flex-col">
      <div class="inline-flex items-center w-full justify-between">
      <div class="flex p-4">
        <a href="/" class="flex items-center">
            <img src={logo} class="h-20 mr-3"/>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyWeekend</span>
        </a>
      </div>
      <div class="flex px-5">
        <ul class="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="/dashboard" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 md:dark:hover:text-[#fb5383] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
          </li>
          <li>
            <a href="/mytrips" class="block py-2 pl-3 pr-4 text-logopink md:bg-transparent md:text-logopink md:p-0 md:dark:text-logopink">My Saved Trips</a>
          </li>
          <li>
            <a href="/communitytrips" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 dark:text-white md:dark:hover:text-[#fb5383] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Community Dashboard</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 dark:text-white md:dark:hover:text-[#fb5383] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
          </li>
        </ul>
      </div>
    </div>
        <div className="w-full flex flex-row px-10 pb-10 items-center space-x-5 justify-end">
          <div className="w-1/4 bg-blue-300 p-4 rounded-lg relative items-center flex justify-end">
            <p className="text-lg font-semibold"><Typewriter text="Here are your saved trips, click one to review it!" delay={50} /></p>
            <div className="bg-blue-300 rotate-45 h-5 w-5 absolute mr-[-24px]"></div>
          </div>
          <img className="h-20 w-20 " src={logo} alt="MyWeekend Logo" />
        </div>
        <div class="grid w-full gap-6 md:grid-cols-4 p-5 ">
      {filteredItineraries.map((loc) => (
        <a href={'/mytrips/'+loc.places[0].id}>
          <div className="w-96 rounded-lg overflow-hidden bg-white group">
              <div className="flex items-center justify-center w-full aspect-h-1 aspect-w-1 overflow-hidden bg-gray-200 lg:aspect-none h-64">
                <img
                  src={loc.places[0].photo}
                  alt={loc.places[0].id}
                  className="h-full w-full object-cover object-center"
                />
              </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold line-clamp-1">{loc.places[0].name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{loc.places[0].description}</p>
                  <div className="flex items-center justify-between pt-4">
                  </div>
                </div>
              </div>
              </a>
      ))}
          
          </div>
       </div>
  )
}

export default MyTrips;