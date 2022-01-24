const initialState = {
    trips: [],
    filterBy: {
        city: '',
        checkInDate: '',
        checkOutDate: '',

    }
    // trip: {
    //     stayTime: {
    //         startDate: null,
    //         endDate: null,
    //     },
    //     guests: {
    //         adults: 1,
    //         children: 0
    //     },
    //     stay: {
    //         address: ''
    //     },

}

export function tripReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case 'SET_TRIPS':
            newState = { ...state, trips: action.trips }
            break
        case 'ADD_TRIP':
            newState = { ...state, trips: [...state.trips, action.trip] }
            break
        case 'REMOVE_TRIP':
            newState = { ...state, trips: state.trips.filter(trip => trip._id !== action.tripId) }
            break
        case 'UPDATE_TRIP':
            newState = {
                ...state, trips: state.trips.map(currTrip => {
                    return (currTrip._id === action.trip._id) ? action.trip : currTrip
                })
            }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break
    }
    return newState
}
