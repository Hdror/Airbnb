const initialState = {
  currPage: ''
}

export function pageReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case 'SET_PAGE':
      newState = { ...state, currPage: action.currPage }
      break
  }

  return newState
}
