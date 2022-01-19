import { stayService } from '../services/stay.service.js'

export function loadStays() {
  return (dispatch, getState) => {
    const { stayModule } = getState()
    console.log(getState(), stayModule);
    const { filterBy } = stayModule
    stayService.query(filterBy).then((stays) => {
      const action = { type: 'SET_STAYS', stays }
      dispatch(action)
    })
  }
}
