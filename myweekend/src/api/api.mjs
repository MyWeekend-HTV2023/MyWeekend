export const Interest = {
    THRILL_SEEKING: {id: 'THRILL_SEEKING', message: 'thrill seeking'},
    FUN_THINGS: {id: 'FUN_THINGS', message: 'fun things to do'}, // attractions
    NATURE: {id: 'NATURE', message: 'nature and hiking'},
    BEACHES: {id: 'BEACHES', message: 'beaches and relaxation'},
    AMUSEMENT_PARKS: {id: 'AMUSEMENT_PARKS', message: 'amusement parks'},
    SIGHTSEEING: {id: 'SIGHTSEEING', message: 'sightseeing'},
    FAMILY_FUN: {id: 'FAMILY_FUN', message: 'family fun'},
    HOTELS: {id: 'HOTELS', message: 'hotels'}
}

export const Budget = {
    FREE: {id: 'FREE', message: 'I am not willing to pay for any attractions, so don\'t add places to the list if they aren\'t free.'},
    CHEAP: {id: 'CHEAP', message: 'My budget is low, so only add places if they are cheap.'},
    MODERATE: {id: 'MODERATE', message: 'My budget is moderate, so don\'t add places if they\'re unreasonably expensive.'},
    LUXURY: {id: 'LUXURY', message: 'My budget is unlimited, and money is not an object, so find me the best places.'}
}

export const GroupSize = {
    SOLO: ('SOLO'),
    DUO: ('DUO'),
    GROUP: ('GROUP')
}

export class DayItineraryRequest {
    constructor(position, interests, budget, groupSize) {
        this.position = position; // Position
        this.interests = interests; // [Interest]
        this.budget = budget; // Budget
        this.groupSize = groupSize; // GroupSize
    }
}

export const PositionType = {
    STRING: 'string',
    COORDINATES: 'coordinates'
}

export class Position {
    constructor(positionType, position) {
        this.positionType = positionType; // PositionType
        this.position = position;
    }
}

export function generateDayItinerary(DayItineraryRequest, callback) {
}