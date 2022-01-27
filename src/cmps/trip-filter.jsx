import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// STORE
import { loadStays, setFilter } from '../store/stay.action.js'

// SVG
import search from '../assest/svg/app-header/search.svg'

// COMPONENTS
import { DateRange as DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file  
import 'react-date-range/dist/theme/default.css' // theme css file
import { GuestsDropDown } from './guests-dropdown.jsx'
import { tripService } from '../services/trip.service.js'
import { utilService } from '../services/util.service.js'

export class _TripFilter extends React.Component {
    state = {
        filterBy: {
            loc: '',
            capacity: 0
        },
        trip: {
            stayTime: {
                startDate: 0,
                endDate: 0,
            },
            guests: {
                adults: 1,
                children: 0
            },
            stay: {
                address: ''
            },
        },
        dateRangeModal: false,
        guestsModal: false
    }

    toggleDateRange = () => {
        this.setState({ dateRangeModal: !this.state.dateRangeModal })
    }

    toggleGuestsModal = () => {
        this.setState({ guestsModal: !this.state.guestsModal })
    }

    // CITY HANDLE 
    handleSearchChanges = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, [field]: value }
        }))
    }

    // GUESTS HANDLE
    updateNumOfGuests = (diff, type, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const { guests } = this.state.trip
        if (guests[type] + diff < 0) return
        guests[type] += diff
        this.setState((prevState) => ({
            trip: { ...prevState.trip, guests },
        }))
    }

    // DATES HANDLE
    handleSelect = (ranges) => {
        // const { trip } = this.state
        let startDate = ranges.selection.startDate.getTime()
        let endDate = ranges.selection.endDate.getTime()
        this.setState((prevState) => ({
            trip: { ...prevState.trip, stayTime: { startDate, endDate } }
        }))
        this.setState({ dateRangeModal: false })
    }

    // FILTER BY ADDRESS
    onSetStayFilter = (ev) => {
        ev.preventDefault()
        const { filterBy, trip } = this.state
        this.props.setFilter(filterBy)
        this.props.loadStays(filterBy)
        tripService.save(trip)
    }

    render() {
        const { guestsModal, dateRangeModal, trip } = this.state
        const { guests } = trip
        const { isMiniHeader } = this.props
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }

        return (
            <div className="trip-build-container flex">
                {!isMiniHeader && <form action="">
                    <div className="trip-location-selector flex">
                        <div className="trip-destination flex">
                            <div className="location-indicator">Location</div>
                            <input className="search-input"
                                onChange={this.handleSearchChanges}
                                type="text"
                                aria-autocomplete="none"
                                autoCorrect="off"
                                name="loc"
                                value={this.state.filterBy.loc}
                                placeholder="Where are you going?"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="trip-selections trip-dates-filter flex" onClick={this.toggleDateRange}>
                            <div>Check in</div>
                            <input readOnly
                                type="text"
                                onChange={this.handleSelect}
                                value={utilService.formattedDates(trip.stayTime.startDate)}
                                name="stayTime"
                                placeholder="Add date" />
                        </div>

                        <div className="trip-selections trip-dates-filter flex" onClick={this.toggleDateRange}>
                            <div>Check out</div>
                            <input readOnly
                                type="text"
                                onChange={this.handleSelect}
                                value={utilService.formattedDates(trip.stayTime.endDate)}
                                name="stayTime"
                                placeholder="Add date" />
                        </div>

                        <div className="search-btn-container flex">
                            <div onClick={this.toggleGuestsModal} className="trip-selections trip-dates-filter flex">
                                <div>Guests</div>
                                <div>
                                    <input
                                        readOnly
                                        className="search-input"
                                        type="text"
                                        onChange={this.handleSelect}
                                        name="guests"
                                        value={`Adults ${trip.guests.adults}, Childern ${trip.guests.children}`}
                                        placeholder="Add guests"
                                    />
                                </div>
                            </div>

                            <div className="search-btn flex" onClick={this.onSetStayFilter}>
                                <Link className="clean-link" to="/stay">
                                    <div className="img-container flex"><img className="search-btn-img" src={search} alt="" /> </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>}
                {isMiniHeader &&
                    <div className="mini-header-filter flex">
                        <div className="mini-header-content flex">
                            {"Location"}
                        </div>
                        <div className="search-img-btn flex">
                            <div className="img-container flex"><img onClick={this.onSetStayFilter} className="search-btn-img" src={search} alt="" /> </div>
                        </div>

                    </div >}
                {dateRangeModal && <div className='date-range-container'>
                    <DateRangePicker
                        className="date-range-calender"
                        appearance="default"
                        placeholder="Default"
                        ranges={[selectionRange]}
                        months={2}
                        direction='horizontal'

                        date={new Date()}
                        onChange={this.handleSelect}
                        moveRangeOnFirstSelection={true}
                        hasCustomRendering={false}
                    />
                </div>}
                {guestsModal && <div>
                    <GuestsDropDown
                        guests={guests}
                        updateNumOfGuests={this.updateNumOfGuests} />
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

const mapDispatchToProps = {
    loadStays,
    setFilter
}

export const TripFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TripFilter)