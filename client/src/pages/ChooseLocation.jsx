import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material';

import Typewriter from './components/Typewriter.jsx'
import Rating from '@mui/material/Rating';

import logo from '../assets/logo.png'
import accessibilityIcon from '../assets/354-200.png'

const locations1 = [
  {
    id: '1',
    name: "Canada's Wonderland",
    description: "Canada's Wonderland is a 134-hectare theme park located in Vaughan, Ontario, a suburb approximately 25 kilometres north of Downtown Toronto. Opened in 1981 by the Taft Broadcasting Company and The Great-West Life Assurance Company as the first major theme park in Canada, it remains the country's largest.",
    photo: "https://viewthevibe.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-9.44.49-AM.png",
    rating: 4.4,
    hours: "10:00 AM - 8:00 PM",
    accessibility: false,
    address: "1 Canada's Wonderland Drive, Vaughan, ON L6A 1S6",
    website: "https://www.canadaswonderland.com/",
    q:""
  },
  {
    id: '2',
    name: "CN Tower",
    description: "The CN Tower is a 553.3 m-high concrete communications and observation tower located in Downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name CN originally referred to Canadian National, the railway company that built the tower.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/1200px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg",
    rating: 4.6,
    hours: "9:00 AM - 10:00 PM",
    accessibility: true,
    address: "290 Bremner Blvd, Toronto, ON M5V 3L9",
    website: "https://www.cntower.ca/",
    q:""
  },
  {
    id: '3',
    name: "Toronto Zoo",
    description: "The Toronto Zoo is a zoo located in Toronto, Ontario, Canada. Encompassing 287 hectares, the Toronto Zoo is the largest zoo in Canada. It is divided into seven zoogeographic regions: Indo-Malaya, Africa, Americas, Tundra Trek, Australasia, Eurasia, and the Canadian Domain.",
    photo: "https://lh3.googleusercontent.com/p/AF1QipPaG1WQx8Xge8hIMpzntkYSRPaC7Jrwdvrnw3om=s680-w680-h510",
    rating: 4.5,
    hours: "9:00 AM - 6:00 PM",
    accessibility: true,
    address: "2000 Meadowvale Rd, Toronto, ON M1B 5K7",
    website: "https://www.torontozoo.com/",
    q:""
  },
  {
    id: '4',
    name: "Ripley's Aquarium of Canada",
    description: "Ripley's Aquarium of Canada is a public aquarium in Toronto, Ontario, Canada. The aquarium is one of three aquariums owned and operated by Ripley Entertainment. It is located in downtown Toronto, just southeast of the CN Tower.",
    photo: "https://lh3.googleusercontent.com/p/AF1QipO3Q_mrfNnz2xqxuFoRHQsouK-yWX15CWe_LRat=s680-w680-h510",
    rating: 4.6,
    hours: "9:00 AM - 11:00 PM",
    accessibility: true,
    address: "288 Bremner Blvd, Toronto, ON M5V 3L9",
    website: "https://www.ripleyaquariums.com/canada/",
    q:''
  }
];

function ChooseLocation() {
  const [locationIndex, setLocationIndex] = useState(0);
  const [chosenLocations, setChosenLocations] = useState([]);
  const [locations, setLocations] = useState(locations1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:3000/api/refine/', {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setLocations(data.places);
          console.log(data.places);
          setUser("");
        });
      } else {
        navigate('/');
      }
    }).catch((error) => { console.log(error); });
  }, []);

  function handleSubmit() {
    chosenLocations.length < 3 ? alert("Please choose at least 3 locations") : postRefine();
  }

  function postRefine() {
    fetch('http://localhost:3000/api/refine/', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        placeIDs: chosenLocations.map((location) => location._id)
      })
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          navigate('/localresult?itineraryID=' + data._id);
          console.log(data);
        });
      } else {
        alert("Something went wrong");
        navigate('/');
      }
    }).catch((error) => { console.log(error); });
  }

  return (
    <div className="h-screen w-screen flex flex-grow-0 flex-col justify-between overflow-auto">
      <div>
        <div class="inline-flex items-center w-full justify-between bg-gray-900">
          <div class="flex p-4">
            <a href="/" class="flex items-center">
              <img src={logo} class="h-20 mr-3" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyWeekend</span>
            </a>
          </div>
          <div class="flex px-5">
            <ul class="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/dashboard" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 md:dark:hover:text-[#fb5383] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/mytrips" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 md:dark:hover:text-[#fb5383] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Saved Trips</a>
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
        <div className="w-full flex flex-row p-10 items-center space-x-5 justify-end">
          <div className="w-1/4 bg-blue-300 p-4 rounded-lg relative items-center flex justify-end">
            <p className="text-lg font-semibold"><Typewriter text="Here's what I found for you!" delay={50} /></p>
            <div className="bg-blue-300 rotate-45 h-5 w-5 absolute mr-[-24px]"></div>
          </div>
          <img className="h-20 w-20 " src={logo} alt="MyWeekend Logo" />
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/2">
            <div className="w-full flex flex-row items-center justify-center space-x-10">
              {locationIndex > 0 ? (
                <button className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                  onClick={() => setLocationIndex(locationIndex - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              ) : (
                <button className="invisible rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                  onClick={() => setLocationIndex(locationIndex)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              <div className="w-96 rounded-lg overflow-hidden bg-gray-900">
                <a className="flex items-center justify-center w-full aspect-h-1 aspect-w-1 overflow-hidden bg-gray-900 lg:aspect-none h-64"
                  href={locations[locationIndex].website}>
                  <div className="group flex items-center justify-center relative bg-gray-900">
                    <img
                      src={locations[locationIndex].photo}
                      alt={locations[locationIndex].name}
                      className="h-full w-full object-cover object-center group-hover:opacity-60"
                    ></img>
                    <div className="invisible absolute group-hover:visible h-10 w-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                  </div>
                </a>
                <div className="p-4 space-y-1">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-semibold line-clamp-1 text-white">{locations[locationIndex].name}</h3>
                    {locations[locationIndex].accessibility && (
                      <Tooltip title="Accessibility"><img src={accessibilityIcon} alt="Accessibility Icon" className="h-6 w-6" /></Tooltip>
                    )}
                  </div>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="text-md font-medium text-white">{locations[locationIndex].rating}</p>
                    <Rating name="half-rating-read" value={locations[locationIndex].rating} precision={0.5} readOnly />
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{locations[locationIndex].description}</p>
                  <p className="text-sm text-white line-clamp-1 pt-4">{locations[locationIndex].address}</p>
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm font-medium text-white">{locations[locationIndex].hours}</p>
                    {
                      chosenLocations.includes(locations[locationIndex]) ? (
                        <button className="rounded-full h-8 w-8 bg-red-500 flex items-center justify-center hover:bg-red-600"
                          onClick={() => { setChosenLocations(chosenLocations.filter((location) => location !== locations[locationIndex])) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                          </svg>
                        </button>
                      ) : (
                        <button className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                          onClick={() => { setChosenLocations([locations[locationIndex], ...chosenLocations]) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
              {locationIndex + 1 < locations.length ? (
                <button className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                  onClick={() => setLocationIndex(locationIndex + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ) : (
                <button className="invisible rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                  onClick={() => setLocationIndex(locationIndex)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </div>
            {chosenLocations.length > 0 && (
              <div>
                <p className="text-lg font-semibold mt-10 text-gray-900 p-4">Locations to include</p>
                <div className="grid grid-cols-4 w-full gap-4 pl-4">
                  {
                    chosenLocations.map((location) => (
                      <div className="bg-gray-900 flex flex-col space-y-2 rounded-xl overflow-clip border-2 border-black relative">
                        <img src={location.photo} alt={location.name} className="h-12 w-full flex-shrink-0 object-cover object-center" />
                        <p className="text-lg font-semibold line-clamp-1 pl-2 text-white">{location.name}</p>
                        <div className="space-x-2 flex flex-row pl-2 pb-1">
                          {location.accessibility && (<Tooltip title="Accessibility"><img src={accessibilityIcon} alt="Accessibility Icon" className="h-6 w-6" /></Tooltip>)}
                        </div>
                        <button className="rounded-full h-8 w-8 flex-shrink-0 bg-red-500 flex items-center absolute bottom-2 right-2 justify-center hover:bg-red-600 border-2 border-red-700"
                          onClick={() => { setChosenLocations(chosenLocations.filter((loc) => loc !== location)) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                          </svg>
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
          <div className="w-1/2 flex text-white mx-8 border-2 border-black rounded-xl">
            <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCAao5fwt_7o0UNWFHSsi6mMkljPpsHSdU&q=place_id:" + locations[locationIndex].place_id}
              className='w-full h-full rounded-xl' />
          </div>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button className="w-64 bg-logopink rounded-lg p-4 text-white font-semibold text-lg hover:bg-altlogopink"
          onClick={handleSubmit}>
          Create Trip
        </button>
      </div>
    </div>
  )
}

export default ChooseLocation;