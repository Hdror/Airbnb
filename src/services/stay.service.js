import { storageService } from './async.storage.js'
import jsonStays from '../data/stay.json'
import { httpService } from './http.service.js'

import Wifi from "../assest/svg/amenities/Wifi.svg"
import Heating from "../assest/svg/amenities/Heating.svg"
import HotTub from "../assest/svg/amenities/HotTub.svg"
import Dryer from "../assest/svg/amenities/Dryer.svg"
import Kitchen from "../assest/svg/amenities/Kitchen.svg"
import Microwave from "../assest/svg/amenities/Microwave.svg"
import Refrigerator from "../assest/svg/amenities/Refrigerator.svg"
import Stove from "../assest/svg/amenities/Stove.svg"
import TV from "../assest/svg/amenities/TV.svg"
import Oven from "../assest/svg/amenities/Oven.svg"
import Hangers from "../assest/svg/amenities/Hangers.svg"
import Hair_Dryer from "../assest/svg/amenities/Hair_Dryer.svg"
import Free_Parking from "../assest/svg/amenities/Free_Parking.svg"


// import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'
const amenitiesSvg = { Dryer, 'Free parking': Free_Parking, Wifi, Heating, HotTub, Kitchen, Microwave, Refrigerator, Stove, TV, Oven, Hangers, 'Hair dryer': Hair_Dryer }


export const stayService = {
  query,
  getById,
  save,
  remove,
  getPriceAvg,
  amenitiesSvg,

}


const stays = jsonStays
_createStays()
// CREATE STAYS
function _createStays() {
  storageService.saveToStorage(STORAGE_KEY, stays)
}

// GET STAYS
async function query(filterBy) {
  // const stays = await storageService.query(STORAGE_KEY)
  const stays = await httpService.get('stay', filterBy)
  const filteredStays = _filteredStays(stays, filterBy)
  return filteredStays
}

// GET FILTERED STAYS
function _filteredStays(stays, filterBy) {
  const { loc } = filterBy
  const filteredStays = stays.filter((stay) => {
    return stay.loc.city.toUpperCase().includes(loc.toUpperCase()) || stay.loc.country.toUpperCase().includes(loc.toUpperCase())
  })
  return filteredStays
}

// GET BY ID
function getById(stayId) {
  // return storageService.get(STORAGE_KEY, stayId)
  return httpService.get(`stay/${stayId}`)
}

// REMOVE
function remove(stayId) {
  return httpService.remove(`stay/${stayId}`)
  // return storageService.remove(STORAGE_KEY, stayId)
}

// SAVE OR UPDATE STAY
function save(stay) {
  if (stay._id) {
    return httpService.put(`stay/${stay._id}`, stay)
  } else {
    return httpService.post('stay', stay)
  }
}

// reduce / foreach
function getPriceAvg(stays) {
  let sumPrice = stays.reduce((acc, stay) => {
    return acc + stay.price
  }, 0)
  return sumPrice / (stays.length)
}