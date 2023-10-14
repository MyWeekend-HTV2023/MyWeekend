import React, { useState } from 'react'

import Typewriter from './components/Typewriter.jsx'

import logo from '../assets/logo.png'

function ChooseLocation() {
  const [locationIndex, setLocationIndex] = useState(0);
  const [chosenLocations, setChosenLocations] = useState([]);

  const locations = [
    {
      id: 1,
      name: "Canada's Wonderland",
      description: "Canada's Wonderland is a 134-hectare theme park located in Vaughan, Ontario, a suburb approximately 25 kilometres north of Downtown Toronto. Opened in 1981 by the Taft Broadcasting Company and The Great-West Life Assurance Company as the first major theme park in Canada, it remains the country's largest.",
      picture: "https://viewthevibe.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-9.44.49-AM.png",
      price: 45
    },
    {
      id: 2,
      name: "CN Tower",
      description: "The CN Tower is a 553.3 m-high concrete communications and observation tower located in Downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name CN originally referred to Canadian National, the railway company that built the tower.",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/1200px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg",
      price: 50
    }
  ]

  function handleSubmit() {
    console.log(chosenLocations);
  }

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-grow-0 flex-col justify-between">
      <div>
        <div className="w-full flex flex-row p-10 items-center space-x-5">
          <img className="h-20 w-20" src={logo} alt="MyWeekend Logo" />
          <div className="w-1/4 bg-blue-300 p-4 rounded-lg relative items-center flex">
            <p className="text-lg font-semibold"><Typewriter text="Here's what I found for you!" delay={50} /></p>
            <div className="bg-blue-300 rotate-45 h-5 w-5 absolute ml-[-24px]"></div>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/2">
            <div className="w-full flex flex-row items-center justify-center space-x-10">
              <button className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                onClick={() => setLocationIndex(locationIndex - 1 > 0 ? locationIndex - 1 : 0)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className="w-96 rounded-lg overflow-hidden bg-white group">
                <div className="flex items-center justify-center w-full aspect-h-1 aspect-w-1 overflow-hidden bg-gray-200 lg:aspect-none h-64">
                  <img
                    src={locations[locationIndex].picture}
                    alt={locations[locationIndex].name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{locations[locationIndex].name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{locations[locationIndex].description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-md font-medium text-gray-900">$ {locations[locationIndex].price}</p>
                    {
                      chosenLocations.some((location) => location.id === locations[locationIndex].id) ? (
                        <button className="rounded-full h-8 w-8 bg-red-500 flex items-center justify-center hover:bg-red-600"
                          onClick={() => { setChosenLocations(chosenLocations.filter((location) => location.id !== locations[locationIndex].id)) }}>
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
              <button className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center hover:bg-gray-600"
                onClick={() => setLocationIndex(locationIndex + 1 < locations.length ? locationIndex + 1 : locationIndex)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            {chosenLocations.length > 0 && (
              <div>
                <p className="text-lg font-semibold mt-10 text-white p-4">Locations to include</p>
                <div className="w-full h-40 p-2 overflow-y-auto space-y-4">
                  {
                    chosenLocations.map((location) => (
                      <div className="w-full h-32 bg-white flex flex-row items-center space-x-4 pr-4 rounded-xl overflow-clip">
                        <img src={location.picture} alt={location.name} className="h-32 w-32 flex-shrink-0 object-cover object-center" />
                        <div>
                          <p className="text-lg font-semibold line-clamp-1">{location.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{location.description}</p>
                          <p className="text-md font-medium text-gray-900">$ {location.price}</p>
                        </div>
                        <button className="rounded-full h-8 w-8 flex-shrink-0 bg-red-500 flex items-center justify-center hover:bg-red-600"
                          onClick={() => { setChosenLocations(chosenLocations.filter((loc) => loc.id !== location.id)) }}>
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
          <div className="w-1/2 flex items-center justify-center text-white">
            Map
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