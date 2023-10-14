import React from 'react'
import logo from '../assets/logo.png'

function Dashboard() {
  return (
  <div class="min-h-screen bg-cover border-gray-200 bg-gray-900 ">
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
            <a href="#" class="block py-2 pl-3 pr-4 text-logopink md:bg-transparent md:text-logopink md:p-0 md:dark:text-logopink" aria-current="page">Home</a>
          </li>
          <li>
            <a href="/mytrips" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-logopink md:p-0 md:dark:hover:text-logopink dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Saved Trips</a>
          </li>
          <li>
            <a href="/communitytrips" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-logopink md:p-0 dark:text-white md:dark:hover:text-logopink dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Community Dashboard</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-logopink md:p-0 dark:text-white md:dark:hover:text-logopink dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
          </li>
        </ul>
      </div>
    </div>

    <form class ='px-5'>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Users or Trips..." required></input>
            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-logopink hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-logopink dark:hover:bg-altlogopink dark:focus:ring-altlogopink">Search</button>
        </div>
    </form>

    <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

    <div class = ' flex items-center justify-end items-end'>
      <div class="inline-flex items-center justify-end">
        <div class="bg-blue-200 p-4 my-6 rounded-lg flex-1">
          <p class = "text-xl">Hello! My name is Willy, your personal trip advisor. What would you like to do today?</p>
        </div>
        <div class="w-3 overflow-hidden ">
          <div class="h-4 bg-blue-200 rotate-45 transform origin-top-left rounded-sm"></div>
        </div>
      </div>
      <img src={logo} class="h-40 p-5 inline-flex"/>
    </div>

    <div class='py-20'>
      <a class='flex text-white justify-center items-center' href='/local'>
          <button class="group relative h-40 w-80 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div class="absolute inset-0 w-3 bg-logopink transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-2xl text-black group-hover:text-white">Plan my weekend</span>
        </button>
      </a>
      <a class= "flex text-white justify-center items-center py-20" href='/abroad'>
        <button class="group relative h-40 w-80 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div class="absolute inset-0 w-3 bg-logopink transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative  text-2xl text-black group-hover:text-white">Plan a trip abroad</span>
        </button>
      </a>
    </div>

  </div>
  )
}

export default Dashboard;