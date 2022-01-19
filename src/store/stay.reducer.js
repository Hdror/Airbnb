const initialState = {
  stays: [],
}

export function stayReducer(state = initialState, action) {
  let newState = state
  switch (action.type) {
    case 'SET_STAYS':
      console.log(state);
      newState = { ...state, stays: [...action.stays] }
      console.log(newState);
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
  }
  return newState
}
