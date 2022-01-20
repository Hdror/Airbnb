import { stayService } from '../services/stay.service.js'

export function loadStays() {
  return (dispatch, getState) => {
    const { stayModule } = getState()
    const { filterBy } = stayModule
    stayService.query(filterBy).then((stays) => {
      const action = { type: 'SET_STAYS', stays }
      dispatch(action)
    })
  }
}
