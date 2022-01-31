import { orderService } from '../../services/order.service.js'

export function loadOrders(filterBy = {}) {
    return async (dispatch) => {
        const orders = await orderService.query(filterBy)
        const action = { type: 'SET_ORDERS', orders }
        dispatch(action)
    }
}

export function setOrders(orders) {
    return async (dispatch) => {
        const action = { type: 'SET_ORDERS', orders }
        dispatch(action)
    }
}

export function addOrder(order) {
    return async (dispatch) => {
        try {
            const orderToAdd = await orderService.save(order)
            dispatch({ type: 'ADD_ORDER', order: orderToAdd })
        } catch (err) {
            console.log('Cannot add order', err);
        }
    }
}

export function updateUnreadCount(isNewOrder) {
    if (isNewOrder) {
        return async (dispatch) => {
            try {
                await dispatch({ type: 'UPDATE_UNREAD_ORDER_COUNT' })

            } catch (err) {
                console.log('Cannot update unread count', err);
            }
        }
    } else {
        return async (dispatch) => {
            try {
                await dispatch({ type: 'RESET_UNREAD_ORDER_COUNT' })

            } catch (err) {
                console.log('Cannot reset unread count', err);
            }
        }
    }
}