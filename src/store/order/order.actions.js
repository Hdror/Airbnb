import { orderService } from '../../services/order.service.js'

export function loadOrders() {
    return (dispatch, getState) => {
        const { orderModule } = getState()
        const { filterBy } = orderModule
        orderService.query().then((orders) => {
            const action = { type: 'SET_ORDERS', orders }
            dispatch(action)
        })
    }
}


// export function addOrder(order) {
//     console.log('Checking store:', order);
//     return (dispatch) => {
//         orderService.save(order)
//             .then(savedOrder => {
//                 console.log(savedOrder);
//                 const action = { type: 'ADD_ORDER', order: savedOrder }
//                 dispatch(action)
//                 console.log('order added')
//             })
//             .catch(err => {
//                 console.error('Cannot add order', err)
//             })
//     }
// }


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




export function removeOrder(orderId) {
}
