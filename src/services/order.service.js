
// const fs = require('fs')

// const orderData = require('../data/order copy.json')

const STORAGE_KEY = 'orderDB'

export const orderService = {
    createOrder,
    // save
}

// fs.readFile('../data/order copy.json')

function createOrder(trip) {
    console.log('Order created', trip);
    // console.log('Order Data', orderData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}

// function save(order) {

// }