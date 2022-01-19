import { storageService } from './async.storage.js'
import jsonStays from '../data/stay.json'

// import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'

export const stayService = {
  query,
  getById,
  save,
  remove,
}

_createStays()
// CREATE STAYS
function _createStays() {
  const stays = jsonStays
  storageService._save(STORAGE_KEY, stays)
}

// GET STAYS
function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY)
}

// GET BY ID
function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

// REMOVE
function remove(stayId) {
  return storageService.remove(STORAGE_KEY, stayId)
}

// SAVE OR UPDATE STAY
function save(stay) {
  console.log(stay)
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay)
  } else {
    // stay.owner = userService.getLoggedinUser()
    // console.log(stay.owner, stay)
    return storageService.post(STORAGE_KEY, stay)
  }
}
