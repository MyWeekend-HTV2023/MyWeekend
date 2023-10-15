import { React, useState }from 'react'
import logo from '../assets/logo.png'
import Typewriter from './components/Typewriter.jsx'

import { Interest, Budget, GroupSize, GenerateRequest, Position, PositionType} from '../../../api/api.mjs';
import { useNavigate } from 'react-router-dom';



function Local() {
  const [location, setLocation] = useState(null);
  const [type, setLocationType] = useState(null);
  const [price, setPrice] = useState(null);
  const [interests, setInterests] = useState([]);
  const [group, setGroup] = useState(null);

  const navigate = useNavigate();

  function send() {
    let position = new Position(type, location);

    let request = new GenerateRequest(position, interests, price, group);
    console.log({position: request.position, interests: request.interests, budget: request.budget, groupSize: request.groupSize})
    fetch(window.location.href.startsWith("http://localhost") ? 'http://localhost:3000/api/generate/' : '/api/generate', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': window.location.href.startsWith("http://localhost") ? 'http://localhost:3000' : 'https://myweekend.app',
      },
      body: JSON.stringify({position: request.position, interests: request.interests, budget: request.budget, groupSize: request.groupSize})
    }).then(response => {
      if (response.status === 201) {
        console.log("Success");
        navigate('/chooselocation');
      } else {
        window.alert("Invalid credentials");
      }});
  }

  const handlePrice = (str) => {
    setPrice(str)
  }
  const handleGroup = (str) => {
    setGroup(str)
  }
  
  const submitLocation = (e, location) => {
    e.preventDefault();
    setLocationType("STRING");
    setLocation(location);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      document.getElementById('location').reset()
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
    setLocation({"lat": position.coords.latitude, "lng": position.coords.longitude});
    setLocationType("COORDINATES");
  }

  const printTest = (e) => {
    e.preventDefault();
    const filter = interests.map((interest) => Interest[interest]);
    let position = new Position( type,location);
    console.log(position, Budget[price], filter, GroupSize[group]);
  }


  return (
    <div class="min-h-screen bg-cover flex flex-col items-center border-gray-200 bg-gray-900 ">
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
              <a href="/" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-logopink md:p-0 md:dark:hover:text-logopink dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
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
      <div className="w-full flex flex-row px-10 pb-10 items-center space-x-5 justify-end">
          <div className="w-1/4 bg-blue-300 p-4 rounded-lg relative items-center flex justify-end">
            <p className="text-lg font-semibold"><Typewriter text="Before I plan your itinerary for you, can you tell me a bit about yourself?" delay={50} /></p>
            <div className="bg-blue-300 rotate-45 h-5 w-5 absolute mr-[-24px]"></div>
          </div>
          <img className="h-20 w-20 " src={logo} alt="MyWeekend Logo" />
        </div>

      <div class="p-2 bg-gray-300 flex items-center flex-col rounded-lg shadow-2xl">
        <div class="p-2">

          <div class="flex justify-center text-2xl p-2">
            <div class='grid grid-cols-2'>
              <div class='inline-flex items-center justify-between'>
              <button onClick={getLocation} class="bg-blue-300 inline-flex p-2 rounded-xl">
                <p class='px-2'>Share GeoLocation</p>
                <img class="h-7 w-7"src="https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_028_share_link_friends_send_android_material-512.png"></img>
              </button>
              </div>
            <div class=''>
              <form id='location' onSubmit={(e) => submitLocation(e, location)}>
                <input id='location-search' class='p-2 rounded-tl-xl rounded-bl-xl' type="text" onChange={(e) => setLocation(e.target.value)} required/>
                <button class='bg-blue-300 p-2 rounded-tr-xl rounded-br-xl' type="submit">Submit</button>
              </form>
            </div>
            </div>
          </div>

        <div class='absolute invisible'>

          <ul class="grid w-full gap-6 md:grid-cols-3">
              <li>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Nearby</div>
                      </div>
                  </label>
              </li>
              <li>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Mid Way</div>
                      </div>
                  </label>
              </li>
              <li>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Far Away</div>
                      </div>
                  </label>
              </li>
            </ul>
          </div>
          </div>
        <div class='p-3'>
        <p class = "p-2 flex justify-center text-2xl">Price</p>
        <div>
          <ul class="grid w-full gap-6 md:grid-cols-4">
              {price == "FREE" ? (
                <li onClick={() => handlePrice("FREE")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer ">                           
                      <div class="block">
                          <h1 class="text-2xl">0</h1>
                          <div class="w-full text-lg font-semibold">Free</div>
                      </div>
                  </label>
              </li>
              ): (
                <li onClick={() => handlePrice("FREE")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      <div class="block">
                          <h1 class="text-2xl">0</h1>
                          <div class="w-full text-lg font-semibold">Free</div>
                      </div>
                  </label>
              </li>
              )}
              {price == "CHEAP" ? (
                <li onClick={() => handlePrice("CHEAP")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <h1 class="text-2xl">$</h1>
                          <div class="w-full text-lg font-semibold">Cheap</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handlePrice("CHEAP")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <h1 class="text-2xl">$</h1>
                          <div class="w-full text-lg font-semibold">Cheap</div>
                      </div>
                  </label>
              </li>
              )}
              {price == "MODERATE" ? (
                <li onClick={() => handlePrice("MODERATE")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <h1 class="text-2xl">$$</h1>
                          <div class="w-full text-lg font-semibold">Moderate</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handlePrice("MODERATE")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <h1 class="text-2xl">$$</h1>
                          <div class="w-full text-lg font-semibold">Moderate</div>
                      </div>
                  </label>
              </li>
              )}
              {price == "LUXURY" ? (
                <li onClick={() => handlePrice("LUXURY")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <h1 class="text-2xl">$$$</h1>
                          <div class="w-full text-lg font-semibold">Luxury</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handlePrice("LUXURY")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <h1 class="text-2xl">$$$</h1>
                          <div class="w-full text-lg font-semibold">Luxury</div>
                      </div>
                  </label>
              </li>
              )}
            </ul>
          </div>
          </div>
        <div class="p-3">
        <p class='flex justify-center text-2xl p-2'>Interests</p>
        <div>
          <ul class="grid w-full gap-6 md:grid-cols-4">
              {interests.some((str) => (str === "NATURE")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "NATURE"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/490/490091.png"></img>
                          <div class="w-full text-lg font-semibold">Nature</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["NATURE", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/490/490091.png"></img>
                          <div class="w-full text-lg font-semibold">Nature</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "BEACHES")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "BEACHES"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn.iconscout.com/icon/free/png-256/free-beach-2570724-2143046.png"></img>
                          <div class="w-full text-lg font-semibold">Beach</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["BEACHES", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn.iconscout.com/icon/free/png-256/free-beach-2570724-2143046.png"></img>
                          <div class="w-full text-lg font-semibold">Beach</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "THRILL_SEEKING")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "THRILL_SEEKING"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-flat-grayscale-icon---rock-climbing-design-thrill-flat-vector-png-image_38041224.png"></img>
                          <div class="w-full text-lg font-semibold">Thrill-Seeking</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["THRILL_SEEKING", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-flat-grayscale-icon---rock-climbing-design-thrill-flat-vector-png-image_38041224.png"></img>
                          <div class="w-full text-lg font-semibold">Thrill-Seeking</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "AMUSEMENT_PARK")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "AMUSEMENT_PARK"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/1188/1188406.png"></img>
                          <div class="w-full text-lg font-semibold">Amusement Park</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["AMUSEMENT_PARK", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/1188/1188406.png"></img>
                          <div class="w-full text-lg font-semibold">Amusement Park</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "FUN_THINGS")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "FUN_THINGS"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://img.freepik.com/premium-vector/ferris-wheel-color-icon-amusement-park-attraction_80590-13432.jpg"></img>
                          <div class="w-full text-lg font-semibold">Fun Attractions</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["FUN_THINGS", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://img.freepik.com/premium-vector/ferris-wheel-color-icon-amusement-park-attraction_80590-13432.jpg"></img>
                          <div class="w-full text-lg font-semibold">Fun Attractions</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "FAMILY_FUN")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "FAMILY_FUN"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://static-00.iconduck.com/assets.00/family-activities-icon-1853x2048-lo3n1bov.png"></img>
                          <div class="w-full text-lg font-semibold">Family Fun</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["FAMILY_FUN", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://static-00.iconduck.com/assets.00/family-activities-icon-1853x2048-lo3n1bov.png"></img>
                          <div class="w-full text-lg font-semibold">Family Fun</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "SIGHTSEEING")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "SIGHTSEEING"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/6350/6350319.png"></img>
                          <div class="w-full text-lg font-semibold">Sight Seeing</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["SIGHTSEEING", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn-icons-png.flaticon.com/512/6350/6350319.png"></img>
                          <div class="w-full text-lg font-semibold">Sight Seeing</div>
                      </div>
                  </label>
              </li>
              )}
              {interests.some((str) => (str === "HOTELS")) ? (
                <li onClick={() => setInterests(interests.filter((interest) => interest !== "HOTELS"))}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn.iconscout.com/icon/free/png-256/free-hotel-512-453740.png"></img>
                          <div class="w-full text-lg font-semibold">Hotels</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => setInterests(["HOTELS", ...interests])}>
                  <input type="checkbox" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <img class ="w-10"src="https://cdn.iconscout.com/icon/free/png-256/free-hotel-512-453740.png"></img>
                          <div class="w-full text-lg font-semibold">Hotels</div>
                      </div>
                  </label>
              </li>
              )}
          </ul>
        </div>
        </div>
        <div class='p-2'>
        <p class = "flex justify-center p-2 text-2xl">Group Size</p>
        <div>
          <ul class="grid w-full gap-6 md:grid-cols-3">
              {group == "SOLO" ? (
                <li onClick={() => handleGroup("SOLO")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Solo</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handleGroup("SOLO")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Solo</div>
                      </div>
                  </label>
              </li>
              )}
              {group == "DUO" ? (
                <li onClick={() => handleGroup("DUO")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Duo</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handleGroup("DUO")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Duo</div>
                      </div>
                  </label>
              </li>
              )}
              {group == "GROUP" ? (
                <li onClick={() => handleGroup("GROUP")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-white bg-gray-600 border-2 border-logopink rounded-lg cursor-pointer">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Group</div>
                      </div>
                  </label>
              </li>
              ) : (
                <li onClick={() => handleGroup("GROUP")}>
                  <input type="radio" id="react-option" value="" class="hidden peer" required=""></input>
                  <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-50">                           
                      <div class="block">
                          <div class="w-full text-lg font-semibold">Group</div>
                      </div>
                  </label>
              </li>
              )}
            </ul>
          </div>
          </div>
        <a class= "flex text-white justify-center items-center py-5">
        <button onClick={send} class="border-b border-logopink group relative h-20 w-80 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div class="absolute inset-0 w-3 bg-logopink transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative  text-2xl text-black group-hover:text-white">Plan my weekend!</span>
        </button>
      </a>
      </div>
    </div>
  )
}

export default Local;