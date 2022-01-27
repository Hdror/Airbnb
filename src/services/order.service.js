import { storageService } from './async.storage.js'
// import jsonorders from '../data/order.json'
// // const fs = require('fs')

// // const orderData = require('../data/order copy.json')

const STORAGE_KEY = 'orderDB'

export const orderService = {
    createOrder,
    save,
    query
}

function createOrder(trip) {
    console.log('Order created', trip);
    // console.log('Order Data', orderData);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    console.log('va', val);
    return (val) ? JSON.parse(val) : null;
}



function save(order) {
    if (order._id) {
        //update
    } else {
        //trip not order at start
        let orders = loadFromStorage(STORAGE_KEY) || []
        // orders = JSON.parse(orders)
        // console.log('Orders', orders);
        // console.log('Save order', order);
        orders.push(order)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
        //add
    }
    return order

}








// GET orderS
async function query() {
    const orders = await storageService.query(STORAGE_KEY)
    console.log(orders);
    // const filteredOrders = _filteredOrders(orders, filterBy)
    return orders
}



// GET BY ID
function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

// REMOVE
function remove(orderId) {
    return storageService.remove(STORAGE_KEY, orderId)
}

// SAVE OR UPDATE order

