import { stayService } from '../services/stay.service.js'


// LOAD STAYS
export function loadStays(filterBy) {
  console.log(filterBy);
  return async (dispatch, getState) => {
    const { stayModule } = getState()
    const stays = await stayService.query(filterBy)
    const action = { type: 'SET_STAYS', stays }
    dispatch(action)
  }
}

// ADD STAY
export function addStay(stay) {
  return (dispatch) => {
    stayService.save(stay)
      .then((savedStay) => {
        dispatch({ type: 'ADD_STAY', stay: savedStay })
      })
      .catch((err) => {
        console.log('Cannot add stay', err)
      })
  }
}

// REMOVE STAY
export function removeStay(stayId) {
  return (dispatch) => {
    stayService.remove(stayId)
      .then(() => {
        dispatch({ type: 'REMOVE_STAY', stayId })
      })
      .catch((err) => {
        console.log('Cannot remove stay', err)
      })
  }
}

// UPDATE STAY
export function onUpdateStay(stay) {
  return async (dispatch) => {
    try {
      const updatedStay = await stayService.save(stay)
      dispatch({ type: 'UPDATE_STAY', updatedStay })
      return stay
    } catch (err) {
      console.log('Cannot  update stay', err)
    }
  }
}

// GET STAY BY ID
export function setCurrStay(stayId) {
  return async (dispatch) => {
    try {
      const currStay = await stayService.getById(stayId)
      dispatch({ type: 'SET_STAY_BY_ID', currStay })
      return currStay
    } catch (err) {
      console.log('Cannot set current stay ', err)
    }
  }
}



export function setFilter(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER', filterBy })
  }
}

export function setFrontFilter(filterBy) {
  return (dispatch) => {
    const action = { type: 'SET_FRONT_FILTER', filterBy }

    dispatch(action)
  }
}