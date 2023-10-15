import { createServer, get } from "http";
import express from "express";
import { rmSync, unlink } from "fs";
import { body, param, validationResult, query} from "express-validator";
import "./util/loadEnvironment.mjs";
// import db from "./db/conn.mjs";
import session from "express-session";
import bcrypt from "bcrypt";
import { Itinerary, ItineraryItem, User, getClient } from "./model/model.mjs";
import { Budget, GroupSize, Interest } from "./../api/api.mjs";
import { generateDayItinerary } from "./util/chatgpt.mjs";
import { findPlace, getPlaceDetails } from "./util/googlemaps.mjs";
import MongoStore from "connect-mongo";
import cors from "cors";
import downloadImage from "./util/file.mjs";
import { nanoid } from 'nanoid';

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["POST", "PUT", "GET", "DELETE"],
//   credentials: true,
// }));
app.use(cors());
app.use(express.static('./api/download/'));

// Setup express-session
var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false,
  },
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    client: getClient(),
    ttl: 1 * 60 * 60,
    autoRemove: 'native',
    collection: 'session'
})
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
app.post("/api/login/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const user = await User.findOne({username: req.body.username})
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    req.session.user_id = user._id;
    res.sendStatus(200).end();
  } else {
    res.status(404).end("User not found!");
  }
});

app.post("/api/register/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  let user = await User.findOne({username: req.body.username})
  if (user) {
    return res.status(409).end("Username already exists!");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  user = await User.create({username: req.body.username, password: hash})
  req.session.user_id = user._id;

  if (req.session.itinerary) {
    saveItinerary(req.session.user_id, req.session.itinerary);
    delete req.session.itinerary;
  }
  res.sendStatus(201).end();
});

app.get("/api/user/", async function (req, res, next) {
  if (!req.session.user_id) {
    return res.status(401).end("User not authenticated!");
  }
  const user = await User.findById(req.session.user_id);
  if (!user) {
    req.session.destroy();
    return res.status(401).end("User not authenticated!");
  }
  res.status(200).json({username: user.username}).end();
  }
);

app.delete("/api/logout/", function (req, res, next) {
  req.session.destroy();
  res.status(204).end();
  }
);

app.post("/api/generate/", body(['position', 'interests', 'budget', 'groupSize']).notEmpty(), 
        body('budget').isIn(Object.keys(Budget)), body('groupSize').isIn(Object.keys(GroupSize)),
        body('interests.*').isIn(Object.keys(Interest)), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const itineraryText = await generateDayItinerary(req.body.position, req.body.interests, 
    req.body.budget, req.body.groupSize);
  const itinerary = JSON.parse(itineraryText);
  if (!itinerary || !itinerary.places || !(itinerary.places instanceof Array)) {
    res.sendStatus(500).end("Error generating itinerary!");
  }
  const finalPlaces = [];
  for (const suggestion of itinerary.places) {
    if (!suggestion.name || !suggestion.description || Object.keys(suggestion).length != 2) {
      res.sendStatus(500).end("Error generating itinerary!");
    }

    const place = await findPlace(req.body.position, suggestion.name);
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

    downloadImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`+
      `&photoreference=${details.photos[0].photo_reference}`+
      `&key=${process.env.GOOGLE_MAPS_API_KEY_1}`,
    `./api/download/download/${details.photos[0].photo_reference}`)

    if (!details.wheelchair_accessible_entrance) {
        details.wheelchair_accessible_entrance = false;
    }

    // weekday = new Date().getDay(); // 0 = sunday -> 6 = saturday

    // TODO Add opening/closing hours...
    finalPlaces.push({
      _id: nanoid(12),
      name: details.name,
      description: suggestion.description,
      rating: details.rating,
      address: details.formatted_address,
      website: details.website,
      photo: `/api/download/${details.photos[0].photo_reference}`,
      accessibility: details.wheelchair_accessible_entrance,
      // hours: details.current_opening_hours.weekday_text[weekday] // 0 = monday -> 6 = sunday
    })
  }

  console.log(finalPlaces);
  req.session.generate = finalPlaces;
  res.status(204).end();
});

app.get("/get/refine/", async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  if (!req.session.generate) {
    return res.sendStatus(404).end();
  }
  res.status(200).json({places: req.session.generate}).end();
});

app.post("/api/refine/", body(['placeIDs']).notEmpty().isArray(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  if (!req.session.generate) {
    return res.sendStatus(404).end();
  }

  const itinerary = [];
  for (const generateItem of req.session.generate) {
    if (req.body.placeIDs.includes(generateItem._id)) {
      itinerary.push(generateItem);
    }
  }
  delete req.session.generate;

  if (req.session.user_id) {
    saveItinerary(req.session.user_id, itinerary);
  } else {
    req.session.itinerary = itinerary;
  }
  console.log(itinerary);
  res.status(200).json(itinerary).end();
});

app.get("/api/itineraries/", async function (req, res, next) {
  const itineraries = await Itinerary.find().sort({likes: -1, _id: -1}).limit(10).exec();
  res.status(200).json({"itineraries": itineraries}).end();
});

async function saveItinerary(user_id, itinerary) {
  await Itinerary.create({user_id: user_id, places: itinerary, likes: 0});
}

app.get("/api/picture/:id", async function (req, res, next) {
  const user = await User.findById(req.session.user_id);
  if (!user) {
    req.session.destroy();
    return res.status(401).end("User not authenticated!");
  }
  res.status(200).json({username: user.username}).end();
  }
);

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});