const initialState = {
  stays: [],
  filterBy: {
    loc: '',
    checkInDate: '',
    checkOutDate: '',
  },
  frontFilterBy:
  {
    typeOfPlace: {
      'Entire place': false,
      'Private room': false,
      'Hotel room': false,
      'Shared room': false
    },
    amenities: [],
    price: {
      minPrice: 0,
      maxPrice: 1000
    }
  }
}

export function stayReducer(state = initialState, action) {
  let newState = state
  console.log(action);
  switch (action.type) {

    case 'SET_STAYS':
      newState = { ...state, stays: [...action.stays] }
      break
    case 'ADD_STAY':
      newState = { ...state, stays: [...state.stays, action.stay] }
      break
    case 'REMOVE_STAY':
      newState = { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
      break
    case 'UPDATE_STAY':
      newState = {
        ...state, stays: state.stays.map(currStay => {
          return (currStay._id === action.stay._id) ? action.stay : currStay
        })
      }
      break
    case 'SET_FILTER':
      newState = { ...state, filterBy: { ...action.filterBy } }
      break
<<<<<<< HEAD
    case 'SET_FRONT_FILTER':
      newState = { ...state, frontFilterBy: { ...action.FilterBy } }
=======
    case 'SET_STAY_BY_ID':
      newState = { ...state, currStay: action.currStay }
>>>>>>> fbdc3391d8ea524bc6c98330973d020874f2e6b1
      break
  }
  return newState
}
