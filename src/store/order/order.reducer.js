const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order] };
        case 'REMOVE_ORDER':
            return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
        case 'UPDATE_ORDER':
            return { ...state, orders: state.orders.map(order => order._id === action.order._id ? action.order : order) }
        default:
            return state
    }
}
