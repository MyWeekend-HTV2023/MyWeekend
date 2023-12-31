import mongoose from "mongoose"
// import "./loadEnvironment.mjs";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS_URI);
}

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
  });
  
export const User = mongoose.model('user', userSchema);

let itineraryItemSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  rating: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: true
  },
  accessibility: {
    type: Boolean,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true
  }
});

export const ItineraryItem = mongoose.model('ItineraryItem', itineraryItemSchema);

let itinerary = new mongoose.Schema({
  user_id: {
    type: String,
    required: false
  },
  places: {
      type: [itineraryItemSchema],
      required: true
  },
  likes: {
    type: Number,
    required: true
  }
});

export const Itinerary = mongoose.model('Itinerary', itinerary);

let itineraryLike = new mongoose.Schema({
  itinerary_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

export const ItineraryLike = mongoose.model('ItineraryLike', itineraryLike);

export function getClient() {
  return mongoose.connection.getClient();
}