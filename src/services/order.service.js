import { httpService } from './http.service.js'
import { storageService } from './async.storage.js'

const STORAGE_KEY = 'orderDB'

export const orderService = {
    query,
    save,
    getById,
    remove,
    getStatistics,
    getStatisticsByCity
}

// GET orderS
async function query(filterBy) {
    const orders = await httpService.get('order', filterBy)
    return orders
}

// SAVE NEW OR EDIT ORDER
async function save(order) {
    if (order._id) {
        const newOrder = await httpService.post('order', order)
        return newOrder
    } else {
        // let orders = loadFromStorage(STORAGE_KEY) || []
        // orders.push(order)
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
        //add
        const newOrder = await httpService.post('order', order)
        return newOrder
    }
}

// GET ORDER BY ID
async function getById(orderId) {
    const order = await httpService.get(`order/${orderId}`)
    return order
    // return storageService.get(STORAGE_KEY, orderId)
}

// REMOVE ORDER
async function remove(orderId) {
    await httpService.delete(`order/${orderId}`)
    //  storageService.remove(STORAGE_KEY, orderId)
}

async function getStatistics() {
    const statistics = await httpService.get(`statistics`)
    return statistics
}

async function getStatisticsByCity(cityName) {
    const statistics = await httpService.get(`statistics/${cityName}`)
    return statistics
}
