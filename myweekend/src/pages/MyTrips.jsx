import {React} from 'react'
import Typewriter from './components/Typewriter.jsx'
import logo from '../assets/logo.png'

function MyTrips() {
  const itinararies = [
    [{
      id: 1,
      name: "Canada's Wonderland",
      description: "Canada's Wonderland is a 134-hectare theme park located in Vaughan, Ontario, a suburb approximately 25 kilometres north of Downtown Toronto. Opened in 1981 by the Taft Broadcasting Company and The Great-West Life Assurance Company as the first major theme park in Canada, it remains the country's largest.",
      picture: "https://viewthevibe.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-9.44.49-AM.png",
      price: 45,
      rating: 4.4,
      hours: "10:00 AM - 8:00 PM"
    }],
    [{
      id: 2,
      name: "CN Tower",
      description: "The CN Tower is a 553.3 m-high concrete communications and observation tower located in Downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name CN originally referred to Canadian National, the railway company that built the tower.",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/1200px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg",
      price: 50,
      rating: 4.6,
      hours: "9:00 AM - 10:00 PM"
    }]
  ]

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
      {itinararies.map((loc) => (
        <a href={'/communitytrips/'+loc[0].id}>
          <div className="w-96 rounded-lg overflow-hidden bg-white group">
              <div className="flex items-center justify-center w-full aspect-h-1 aspect-w-1 overflow-hidden bg-gray-200 lg:aspect-none h-64">
                <img
                  src={loc[0].picture}
                  alt={loc[0].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold line-clamp-1">{loc[0].name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{loc[0].description}</p>
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