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
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

export const ItineraryItem = mongoose.model('ItineraryItem', itineraryItemSchema);