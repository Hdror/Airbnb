
// const fs = require('fs')

// const orderData = require('../data/order copy.json')

const STORAGE_KEY = 'orderDB'

export const orderService = {
    createOrder,
    save
}

// fs.readFile('../data/order copy.json')

function createOrder(trip) {
    console.log('Order created', trip);
    // console.log('Order Data', orderData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}

// function save(order) {

// }

function save(order) {
    console.log('Asynch', order);
    // if (order._id) {
    //     return httpService.put(`order/${order._id}`, order)
    return order

    // } else {

    //     return httpService.post(`order/`, order)
    // }

}
