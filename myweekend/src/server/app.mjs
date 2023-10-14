import { createServer } from "http";
import express from "express";
import { rmSync, unlink } from "fs";
import { body, param, validationResult, query} from "express-validator";
import "./loadEnvironment.mjs";
import db from "./db/conn.mjs";
import session from "express-session";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup express-session.
var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

class ItineraryItem {
  constructor() {
  }
}

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.post()

// Create
app.post("/api/login/", body(['username, password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const users = await db.collection("users");
  const user = await users.findOne({username: req.body.username})

  bcrypt.compareSync("my password", hash);
});

// Create
app.post("/api/login/", body(['username, password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const users = await db.collection("users");
  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("my password", salt);
});

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});