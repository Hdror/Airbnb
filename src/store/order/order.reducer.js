const initialState = {
    orders: [],
    unreadOrdersCount: 0
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: [...action.orders], unreadOrdersCount: action.orders.filter((order) => !order.isRead).length }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order], unreadOrdersCount: [...state.orders, action.order].filter((order) => !order.isRead).length };
        case 'REMOVE_ORDER':
            return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
        case 'UPDATE_ORDER':
            return { ...state, orders: state.orders.map(order => order._id === action.order._id ? action.order : order), unreadOrdersCount: state.orders.map(order => order._id === action.order._id ? action.order : order).filter((order) => !order.isRead).length }
        // case 'UPDATE_UNREAD_ORDER_COUNT':
        //     return { ...state, unreadOrdersCount: state.unreadOrdersCount + 1 }
        // case 'RESET_UNREAD_ORDER_COUNT':
        //     return { ...state, unreadOrdersCount: 0 }
        default:
            return state
    }
}
