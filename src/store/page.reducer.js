const initialState = {
  currPage: '',
  isModalOpen: false,
  modalState: {
    shareModal: false,
    dateRangeModal: false,
    guestsModal: false,
    menuDropDownModal: false,
    typeOfPlaceModal: false,
    priceModal: false,
    datePickerModal: false,
    reserveGuestsModal: false,
    searchSuggestion: false,
    googlePhoneNumber: false
  }
}

const closeModalState = {
  shareModal: false,
  dateRangeModal: false,
  guestsModal: false,
  menuDropDownModal: false,
  typeOfPlaceModal: false,
  priceModal: false,
  datePickerModal: false,
  reserveGuestsModal: false,
  searchSuggestion: false,
  googlePhoneNumber: false
}

export function pageReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case 'SET_PAGE':
      newState = { ...state, currPage: action.currPage }
      break
    case 'CLOSE_MODAL':
      newState = { ...state, modalState: { ...closeModalState }, isModalOpen: false }
      break
    case 'OPEN_MODAL':
      newState = { ...state, modalState: { ...closeModalState, [action.modalName]: true }, isModalOpen: true }
      break
  }
  return newState
}

