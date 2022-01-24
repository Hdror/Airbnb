import { tripService } from '../../services/trip.service.js'

export function loadTrips() {
    return (dispatch, getState) => {
        const { tripModule } = getState()
        const { filterBy } = tripModule
        tripService.query(filterBy).then((trips) => {
            const action = { type: 'SET_TRIPS', trips }
            dispatch(action)
        })
    }
}

export function addTrip(stay) {
    tripService.save(stay)
}

export function removeTrip(stayId) {
    tripService.remove(stayId)
}
