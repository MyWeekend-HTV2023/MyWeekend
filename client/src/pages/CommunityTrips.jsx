import React, {useState, useEffect} from 'react'
import Typewriter from './components/Typewriter.jsx'
import logo from '../assets/logo.png'

function CommunityTrips() {
  const [itinararies, setItineraries] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/itineraries/')
    .then((res) => res.json())  
    .then((data) => {
        setItineraries(data.itineraries)
        console.log(itinararies)
      })
    .catch((err) => {
        console.log(err.message);
      });
  }, []);
 
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
            <p className="text-lg font-semibold"><Typewriter text="Here the top saved trips, click one to review it!" delay={50} /></p>
            <div className="bg-blue-300 rotate-45 h-5 w-5 absolute mr-[-24px]"></div>
          </div>
          <img className="h-20 w-20 " src={logo} alt="MyWeekend Logo" />
        </div>
        <div class="grid w-full gap-6 md:grid-cols-4 p-5 ">
      {itinararies.map((loc) => (
        <a href={'/communitytrips/'+loc.places[0].id}>
          <div className="w-96 rounded-lg overflow-hidden bg-white group">
              <div className="flex items-center justify-center w-full aspect-h-1 aspect-w-1 overflow-hidden bg-gray-200 lg:aspect-none h-64">
                {console.log(loc.places[0].photo)}
                <img
                  src={loc.places[0].photo}
                  alt={loc.places[0].id}
                  className="h-full w-full object-cover object-center"
                />
              </div>
                <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold line-clamp-1">{loc.places[0].name}</h3>
                    <div class="inline-flex">
                    <img class="h-5 flex justify-end" src="data:image/png;base64,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"></img>
                    <p class='px-2'>{loc.likes}</p>
                  </div>
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
export default CommunityTrips;