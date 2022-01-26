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
export class _TripFilter extends React.Component {
    state = {
        filterBy: {
            loc: '',
            capacity: 0
        },
        trip: {
            stayTime: {
                startDate: '',
                endDate: '',
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

    toggleguestsModal = () => {
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

    convertDates = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    // GUESTS HANDLE
    updateNumOfGuests = (diff, type, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const { guests } = this.state.trip
        if (guests[type] + diff < 0) return
        guests[type] += diff
        this.setState((prevState) => ({
            newOrder: { ...prevState.newOrder, guests },
        }))
    }

    // DATES HANDLE
    handleSelect = (ranges) => {
        console.log(ranges);
        const { trip } = this.state
        this.setState((prevState) => ({
            trip: { ...prevState.trip, stayTime: { startDate: ranges.selection.startDate, endDate: ranges.selection.endDate } }
        }))
        this.setState({ dateRangeModal: false })
    }

    // FILTER BY ADDRESS
    onSetStayFilter = (ev) => {
        console.log(this.state.trip);
        ev.preventDefault()
        const { filterBy } = this.state
        this.props.setFilter(filterBy)
        this.props.loadStays(filterBy)
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
                        <label htmlFor="trip-location">
                            <div className="trip-destination flex"><span>Location</span>
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
                        </label>
                    </div>
                    <div className="flex">
                        <div className="trip-selections trip-dates-filter flex" onClick={this.toggleDateRange}>
                            <div>Check in</div>
                            <input readOnly
                                type="text"
                                onChange={this.handleSelect}
                                value={trip.stayTime.startDate}
                                name="stayTime"
                                placeholder="Add date" />
                        </div>

                        <div className="trip-selections trip-dates-filter flex" onClick={this.toggleDateRange}>
                            <div>Check out</div>
                            <input readOnly
                                type="text"
                                onChange={this.handleSelect}
                                value={trip.stayTime.endDate}
                                name="stayTime"
                                placeholder="Add date" />
                        </div>

                        <div className="search-btn-container flex">
                            <div onClick={this.toggleguestsModal} className="trip-selections trip-dates-filter flex">
                                <div>Guests</div>
                                <div>Add guests</div>
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