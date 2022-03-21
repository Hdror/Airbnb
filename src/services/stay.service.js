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


// GET STAYS
async function query(filterBy = []) {
  return await httpService.get('stay', filterBy)
}

// GET BY ID
function getById(stayId) {
  return httpService.get(`stay/${stayId}`)
}

// REMOVE
function remove(stayId) {
  return httpService.remove(`stay/${stayId}`)
}

// SAVE OR UPDATE STAY
function save(stay) {
  console.log('stay in stayService', stay);
  if (stay._id) {
    // EDIT
    return httpService.put(`stay/${stay._id}`, stay)
  } else {
    // ADD
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