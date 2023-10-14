import { createServer, get } from "http";
import express from "express";
import { rmSync, unlink } from "fs";
import { body, param, validationResult, query} from "express-validator";
import "./loadEnvironment.mjs";
// import db from "./db/conn.mjs";
import session from "express-session";
import bcrypt from "bcrypt";
import { ItineraryItem, User } from "./model/model.mjs";
import { Budget, GroupSize, Interest } from "../api/api.mjs";
import { generateDayItinerary } from "./chatgpt.mjs";
import { findPlace, getPlaceDetails } from "./googlemaps.mjs";

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup express-session
var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  saveUninitialized: true,
  resave: false
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

// Create
app.post("/api/login/", body(['username, password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const user = await User.findOne({username: req.body.username})
  if (user && bcrypt.compareSync(user.password, hash)) {
    res.sendStatus(200).end();
  } else {
    res.status(404).end("User not found!");
  }
});

app.post("/api/register/", body(['username, password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const user = await User.findOne({username: req.body.username})
  if (user) {
    return res.status(409).end("Username already exists!");
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  
  user = await User.create({username: req.body.username, password: req.body.password})
  res.status(201).json(user).end();
});

app.get("/api/generate/", body(['position', 'interests', 'budget', 'groupSize']).notEmpty(), 
        body('budget').isIn(Object.keys(Budget)), body('groupSize').isIn(Object.keys(GroupSize)),
        body('interests.*').isIn(Object.keys(Interest)), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  // const itineraryText = await generateDayItinerary(req.body.position, req.body.interests, 
    // req.body.budget, req.body.groupSize);
  // const itinerary = JSON.parse(itineraryText);
  const itinerary = {
    "places": [
      {
        "name": "Canada's Wonderland",
        "description": "One of North America's largest amusement parks, featuring over 200 attractions including roller coasters, water slides, and live shows."
      },
      {
        "name": "EdgeWalk at the CN Tower",
        "description": "Experience the world's highest full-circle hands-free walk on a 5 ft (1.5 m) wide ledge encircling the top of the CN Tower, 1168 ft (356 m) above the ground."
      },
      {
        "name": "iFLY Toronto Indoor Skydiving",
        "description": "Experience the thrill of skydiving without jumping out of an airplane at this indoor wind tunnel facility."
      },
      {
        "name": "The Bat Cave Escape Room",
        "description": "Challenge your problem-solving skills in this immersive escape room experience with a Batman-themed twist."
      },
      {
        "name": "G-Force Adventures Jet Boat Ride",
        "description": "Hold on tight for a thrilling jet boat ride on Lake Ontario, experiencing high-speed spins, slides, and wave jumps."
      },
      {
        "name": "Archery District Toronto",
        "description": "Unleash your inner Katniss Everdeen or Legolas with a thrilling game of archery tag, combining elements of dodgeball and archery."
      },
      {
        "name": "Sky Zone Trampoline Park",
        "description": "Jump, flip, and bounce to your heart's content at this indoor trampoline park with various zones and activities."
      },
      {
        "name": "Treetop Trekking Stouffville",
        "description": "Embark on an exhilarating aerial adventure, navigating through treetop courses, zip lines, and other obstacles."
      },
      {
        "name": "Rage Room Toronto",
        "description": "Release your pent-up stress by smashing objects in a controlled environment at this unique rage room experience."
      },
      {
        "name": "Toronto Rush Ultimate Frisbee Game",
        "description": "Watch the Toronto Rush, a professional ultimate frisbee team, compete in fast-paced and thrilling matches at Lamport Stadium."
      }
    ]
  }
  if (!itinerary || !itinerary.places || !(itinerary.places instanceof Array)) {
    res.sendStatus(500).end("Error generating itinerary!");
  }
  const finalPlaces = [];
  for (const suggestion of itinerary.places) {
    if (!suggestion.name || !suggestion.description || Object.keys(suggestion).length != 2) {
      res.sendStatus(500).end("Error generating itinerary!");
    }

    const place = await findPlace(suggestion.name);
    if (!place || !place.place_id) {
      continue;
    }
    const details = await getPlaceDetails(place.place_id);
    if (!details) {
      continue;
    }
    if (details.business_status != "OPERATIONAL") {
      continue;
    }

    // TODO Optimize this, insert in bulk.
    const finalPlace = await ItineraryItem.create({
      name: details.name,
      description: suggestion.description,
      rating: details.rating,
      address: details.formatted_address,
      website: details.website,
      photo: details.photos[0].photo_reference
    });

    finalPlaces.push(finalPlace)
  }
  res.status(200).json(finalPlaces).end();
});

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});