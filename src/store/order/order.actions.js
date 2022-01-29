import { orderService } from '../../services/order.service.js'

export function loadOrders(filterBy = {}) {
    return async (dispatch) => {
        const orders = await orderService.query(filterBy)
        const action = { type: 'SET_ORDERS', orders }
        dispatch(action)
    }
}

export function addOrder(order) {
    return async (dispatch) => {
        try {
            const orderToAdd = await orderService.save(order)
            console.log(orderToAdd);
            dispatch({ type: 'ADD_ORDER', order: orderToAdd })
        } catch (err) {
            console.log('Cannot add order', err);
        }
    }
}
