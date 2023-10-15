import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});

export async function findPlace(position, name) {
  const res = await client.findPlaceFromText({
    params: {
      input: name,
      inputtype: 'textquery',
      locationbias: `point:${position.lat},${position.lng}`,
      key: process.env.GOOGLE_MAPS_API_KEY_1,
    },
    timeout: 1000,
  });
  if (res.data.status !== "OK") {
    console.log(res.data);
    return null;
  }
  return res.data.candidates[0];
}

export async function getPlaceDetails(placeID) {
  const res = await client.placeDetails({
    params: {
      place_id: placeID,
      fields: [
        "name",
        "business_status", 
        "formatted_address", 
        "photo",
        "current_opening_hours", 
        "website", 
        "rating",
        "wheelchair_accessible_entrance"
      ],
      key: process.env.GOOGLE_MAPS_API_KEY_1,
    },
    timeout: 2000,
  });
  if (res.data.status !== "OK") {
    // console.log(res.data);
    return null;
  }
  return res.data.result;
}

export async function getAddressFromCoords(coordinates) {
  const res = await client.reverseGeocode({
    params: {
      latlng: coordinates,
      key: process.env.GOOGLE_MAPS_API_KEY_1,
    },
    timeout: 2000,
  });
  if (res.data.status !== "OK") {
    // console.log(res.data);
    return null;
  }
  result = res.data.results[0];
  if (!result) {
    return null;
  }
  let country = '';
  let state = '';
  let city = '';
  for (const component of result.address_components) {
    if (component.types.includes("country")) {
      country = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      state = component.long_name;
    }
    if (component.types.includes("locality")) {
      city = component.long_name;
    }
  }
  if (city == '' || state == '' || country == '') {
    return null;
  }
  return `${city}, ${state}, ${country}`;
}

export async function getCoordsFromAddress(address) {
  const res = await client.geocode({
    params: {
      address: address,
      key: process.env.GOOGLE_MAPS_API_KEY_1,
    },
    timeout: 2000,
  });
  if (res.data.status !== "OK") {
    // console.log(res.data);
    return null;
  }
  result = res.data.results[0];
  if (!result || !result.geometry || !result.geometry.location) {
    return null;
  }
  return result.geometry.location;
}
