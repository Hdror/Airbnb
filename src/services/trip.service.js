

// _getEmptyTrip()
// updateTrip()
// query() - localStorage to get trip
// clearTrip() after trip -> order

import { storageService } from './async.storage.js'
// import jsontrips from '../data/trip.json'


// import { userService } from './user.service.js'

const STORAGE_KEY = 'tripDB'


export const tripService = {
    query,
    getById,
    save,
    remove,

}

_createTrips()
// CREATE TRIP
function _createTrips() {
    const trips = storageService.loadFromStorage(STORAGE_KEY) || []
    storageService.saveToStorage(STORAGE_KEY, trips)
}

// GET TRIPS
function query(filterBy = {}) {
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
    console.log(trip)

    // if (trip._id) {
    //     return storageService.put(STORAGE_KEY, trip)
    // } else {
    //     // trip.owner = userService.getLoggedinUser()
    //     // console.log(trip.owner, trip)
    // return storageService.post(STORAGE_KEY, trip)
    // }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}


