import { ChatGPTAPI } from "chatgpt"
import { Budget, GroupSize, Interest, PositionType } from "../../api/api.mjs"

const SYSTEM_MESSAGE =  "You are my personal assistant that recommends "+
"places to go based on my interests, specific location, and the budget of what I "+
"am willing to spend on each attraction. Please return the specific name of each place, "+
"along with a short description of less than 30 words in json format. Only respond with "+
"the json object, in the following format: {\"places\": [{\"name\": \"name\", "+
"\"description\": \"description\"}, ...]}."

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY_1,
  completionParams: {
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
  }
})

export async function generateDayItinerary(address, interests, budget, groupSize) {
  var interestsString = ''
  for (const interest of interests) {
    if (!Interest[interest]) {
      continue;
    }
    interestsString += Interest[interest].message
    if (interest != interests[interests.length - 1]) interestsString += ", "
  }

  const res = await api.sendMessage(`My current interests are ${interestsString}. `+
  `${Budget[budget].message} ${GroupSize[groupSize].message} Find me 10 places to go in ${address}.`, 
  {systemMessage: SYSTEM_MESSAGE})

  // console.log(res.text)
  
  return res.text
}