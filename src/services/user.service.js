import { storageService } from './async.storage.js';
import { utilService } from './util.service.js'
import userJson from '../data/user.json'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getEmptyUser
}

const STORAGE_KEY = 'users'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

window.us = userService

const users = userJson
_createUsers()
function _createUsers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function login(credentials) {
  return storageService.query(STORAGE_KEY).then(users => {
    const user = users.find(user => user.phonenumber === credentials.phonenumber &&
      user.email === credentials.email)
    if (user) {
      localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
      return user
    } else {
      console.log('No user with those credentials')
      console.log(user)
      return user
    }
  })
}

function signup(userInfo) {
  return storageService.post(STORAGE_KEY, userInfo)
    .then((user) => {
      localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
      return user
    })
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