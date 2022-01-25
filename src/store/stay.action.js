import { stayService } from '../services/stay.service.js'

export function loadStays(filterBy) {
  return async (dispatch, getState) => {
    const { stayModule } = getState()
    const stays = await stayService.query(filterBy)
    const action = { type: 'SET_STAYS', stays }
    dispatch(action)
  }
}


export function addStay(stay) {
  stayService.save(stay)
}

export function removeStay(stayId) {
  stayService.remove(stayId)
}

export function setFilter(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER', filterBy })
  }
}