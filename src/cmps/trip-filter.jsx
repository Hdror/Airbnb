import React from 'react'
import { connect } from 'react-redux'
import { loadStays, setFilter } from '../store/stay.action.js'

// SVG
import search from '../assest/svg/app-header/search.svg'

// COMPONENTS
import { DateRange } from './date-range.jsx'

export class _TripFilter extends React.Component {
    state = {
        filterBy: {
            loc: '',
            checkInDate: '',
            checkOutDate: '',
        },
        dateRangeModal: false,
    }

    toggleDateRange = () => {
        this.setState({ dateRangeModal: !this.state.dateRangeModal })
    }

    handleSearchChanges = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, [field]: value }
        }))
    }

    onSetStayFilter = (ev) => {
        ev.preventDefault()
        const { filterBy } = this.state
        this.props.setFilter(filterBy)
        this.props.loadStays(filterBy)
    }

    render() {
        const { dateRangeModal } = this.state
        const { isMiniHeader } = this.props
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
                            <div>Add dates</div>
                        </div>

                        <div className="trip-selections trip-dates-filter flex" onClick={this.toggleDateRange}>
                            <div>Check out</div>
                            <div>Add dates</div>
                        </div>

                        <div className="search-btn-container flex">
                            <div className="trip-selections trip-dates-filter flex">
                                <div>Guests</div>
                                <div>Add guests</div>
                            </div>
                            <div className="search-btn flex">
                                <div className="img-container flex"><div></div><img onClick={this.onSetStayFilter} className="search-btn-img" src={search} alt="" /> </div>
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
                            <div className="img-container flex"><img className="search-btn-img" src={search} alt="" /> </div>
                        </div>

                    </div >}
                {dateRangeModal && <DateRange setDates={this.setDates} />}
            </div >
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