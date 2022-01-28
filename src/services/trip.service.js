
// _getEmptyTrip()
// updateTrip()
// query() - localStorage to get trip
// clearTrip() after trip -> order

import { storageService } from './async.storage.js'

const STORAGE_KEY = 'tripDB'


export const tripService = {
    query,
    getById,
    save,
    remove,
}


const initialTrip = {
    stayTime: {
        startDate: 0,
        endDate: 0,
    },
    guests: {
        adults: 1,
        children: 0
    },
    stay: {
        address: ''
    },
}

// _createTrips()
// CREATE TRIP
// function _createTrips() {
//     const trips = storageService.loadFromStorage(STORAGE_KEY) || []
//     storageService.saveToStorage(STORAGE_KEY, trips)
// }




const initialTrip = {
    stayTime: {
        startDate: 0,
        endDate: 0,
    },
    guests: {
        adults: 1,
        children: 0


    },
    totalPrice: 0
}

_createTrips()
// CREATE TRIP
function _createTrips() {
    const trips = storageService.loadFromStorage(STORAGE_KEY) || initialTrip
    storageService.saveToStorage(STORAGE_KEY, trips)
}

// GET TRIPS
function query() {
    return storageService.query(STORAGE_KEY)
}

// GET BY ID
function getById(tripId) {
    return storageService.get(STORAGE_KEY, tripId)
}

// REMOVE
function remove(tripId) {
    return storageService.remove(STORAGE_KEY, tripId)
}

// SAVE OR UPDATE TRIP
function save(trip) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}


