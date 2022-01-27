import { userService } from '../services/user.service.js'

const loggedInUser = userService.getLoggedinUser()
// const guest = {
//     _id: 123,
//     fullname: 'guest123'
// }
const initialState = {
    user: loggedInUser ? loggedInUser : null,
    users: []
}


// add update user
export function userReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break
        case 'REMOVE_USER':
            newState = {
                ...state, users: state.users.filter((user) => user._id !== action.userId),
            }
            break
        case 'ADD_USER_LIKED_STAY':
            newState = { ...state, user: action.user }
            break
        case 'REMOVE_USER_LIKED_STAY':
            newState = { ...state, user: action.user }
            break
        case 'LOAD_USER_LIKED_STAYS':
            newState = { ...state, savedStays: [...action.stays] }
            break
        case 'LOAD_USER_STAYS':
            newState = { ...state, savedStays: [...action.stays] }
            break
        case 'REMOVE_ORDER_FROM_USER':
            newState = {
                ...state,
                orders: state.orders.filter((order) => order._id !== action.orderId),
            }
            break

    }
    return newState
}
