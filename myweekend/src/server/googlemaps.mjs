import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});

export async function findPlace(name) {
  const res = await client.findPlaceFromText({
    params: {
      input: name,
      inputtype: 'textQuery',
      fields: ["address_components", "adr_address", "business_status", "formatted_address", "icon", "photo",
            "current_opening_hours", "opening_hours", "secondary_opening_hours", "website", "rating"],
      key: process.env.GOOGLE_MAPS_API_KEY_1,
    },
    timeout: 2000,
  });
  if (res.data.status !== "OK") {
    console.log(res.data);
    return null;
  }
  return res.data;
}