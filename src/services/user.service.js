// import { storageService } from './async.storage.js';
import { utilService } from './util.service.js'
// import userJson from '../data/user.json'
import { httpService } from './http.service.js';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getEmptyUser,
  update
}

// const STORAGE_KEY = 'users'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

window.us = userService

async function login(credentials) {
  const user = await httpService.post(`auth/login`, credentials)
  if (user) {
    localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
  } else {
    return null
  }
}


async function signup(userInfo) {
  const newUser = await httpService.post('auth/signup', userInfo)
  localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser))
  return newUser
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user)
  if (getLoggedinUser()?._id === user._id) _saveLocalUser(user)
  return user
}

function _saveLocalUser(user) {
  if (!user) return
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
  return user
}

function logout() {
  localStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function getEmptyUser() {
  return {
    _id: utilService.makeId(),
    fullname: '',
    imgUrl: '',
    isHost: false,
    username: '',
    phonenumber: '',
    email: '',
    likedStays: [],
    orders: []
  }
}