
import { useNavigate } from "react-router-dom";

import '../styles/Landing.css'

import logo from '../../assets/logo.png'
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
        <div class='bg-cover flex flex-col items-center border-gray-200 bg-gray-900 '>
        <div class="inline-flex items-center w-full justify-between">
      <div class="flex p-4">
        <a href="/" class="flex items-center">
            <img src={logo} class="h-20 mr-3"/>
            <span class="self-center text-5xl font-semibold whitespace-nowrap dark:text-white">MyWeekend</span>
        </a>
      </div>
      <div class="flex px-5">
        <ul class="text-xl flex flex-col md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="#dashboard" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 md:dark:hover:text-[#fb5383] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Dashboard</a>
          </li>
          <li>
            <a href="/communitytrips" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 dark:text-white md:dark:hover:text-[#fb5383] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Community Dashboard</a>
          </li>
          <li>
            <a href="/login" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 dark:text-white md:dark:hover:text-[#fb5383] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</a>
          </li>
          <li>
            <a href="/signup" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#fb5383] md:p-0 dark:text-white md:dark:hover:text-[#fb5383] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Signup</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
    )
}

function Body(){
    return(<>
    <div className="welcome">
        <div class=''>
            <div className="title">Welcome To <span>MyWeekend</span></div>
            <div class='flex justify-center items-center'>
                <a href="#dashboard" className="inline-flex flex items-center rounded-lg bg-logopink p-2 pe-5 hover:bg-[#f55d88]">
                <p class='text-4xl px-5'>Get Started</p>
                <svg class="animate-bounce w-8 h-8 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
                </a>
            </div>
        </div>
        <img src="/worldwide.png" alt="" />
    </div>
    
    </>)
}

function Info(){
    const navigate = useNavigate();

    const navigateToLocal = () => {
        navigate('/local');
    };
    const navigateToAbroad = () => {
        navigate('/abroad');
    };
    return(<>
        <section id="dashboard" class='scroll-smooth'>
        <div className="information-container">
            <div className="text">
                We leverage the power of AI to curate personalized travel experiences.
            </div>
            <div className="holder">
                <div className="card">
                    Build itinerary based on your preferences.
                </div>
                <div className="card">
                    Save your favourite places and events.
                </div>
                <div className="card">
                    Share your itinerary with friends and family.
                </div>
            </div>
            {/* <div className="button-container">
                <button onClick={navigateToLocal}>Local Trip</button>
                <button onClick={navigateToAbroad}>Abroad Trip</button>
            </div> */}
            <div class="text-6xl flex flex-row">
                <div class = 'px-20'>
                    <a class="hover:bg-blue-300 flex p-5 rounded-lg flex-row bg-[#53c6fb]"href="/local">
                        <img class="px-2 h-10" src="https://cdn.pixabay.com/photo/2014/03/25/16/31/stick-man-297255_1280.png"></img>
                        Plan a Trip
                        <img class="h-10"src="https://static.vecteezy.com/system/resources/previews/021/286/390/original/aeroplane-airplane-icon-on-transparent-background-free-png.png"></img>
                    </a>
                </div>
            </div>
        </div>
        </section>
    </>)
}

export {Taskbar, Body, Info}