import { storageService } from './async.storage.js'
import jsonStays from '../data/stay.json'

import Wifi from "../assest/svg/amenities/Wifi.svg"
import Heating from "../assest/svg/amenities/Heating.svg"
import HotTub from "../assest/svg/amenities/HotTub.svg"
import Free_Parking from "../assest/svg/amenities/Free_Parking.svg"
import Dryer from "../assest/svg/amenities/Dryer.svg"
import Kitchen from "../assest/svg/amenities/Kitchen.svg"
import Microwave from "../assest/svg/amenities/Microwave.svg"
import Refrigerator from "../assest/svg/amenities/Refrigerator.svg"
import Stove from "../assest/svg/amenities/Stove.svg"
import TV from "../assest/svg/amenities/TV.svg"
import Oven from "../assest/svg/amenities/Oven.svg"
import Hangers from "../assest/svg/amenities/Hangers.svg"
import Hair_Dryer from "../assest/svg/amenities/Hair_Dryer.svg"

// import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'
const amenitiesSvg = { Dryer, 'Free parking': Free_Parking, Wifi, Heating, HotTub, Kitchen, Microwave, Refrigerator, Stove, TV, Oven, Hangers, 'Hair dryer': Hair_Dryer }


export const stayService = {
  query,
  getById,
  save,
  remove,
  amenitiesSvg,

}

_createStays()
// CREATE STAYS
function _createStays() {
  const stays = jsonStays
  storageService._save(STORAGE_KEY, stays)
}

// GET STAYS
async function query(filterBy = {}) {
  const stays = storageService.query(STORAGE_KEY)
  return stays
}

function _filteredStaysByAmens(stays, filterBy) {
  const { amenities } = filterBy
  const filteredStaysByAmens = stays.amenities.filter((stay) => {
    return stay.amenities.includes()
  })
  return Promise.resolve(filteredStaysByAmens)
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


