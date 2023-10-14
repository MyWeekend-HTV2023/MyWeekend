export const Interest = {
    THRILL_SEEKING: 'thrill_seeking',
    FUN_THINGS: 'fun_things'
}

export class DayItineraryRequest {
    constructor(positionCoords, positionString, interests) {
        this.positionCoords = positionCoords;
        this.positionString = positionString;
        this.interests = interests;
    }
}

export function getDayItinerary(DayItineraryRequest, callback) {
}