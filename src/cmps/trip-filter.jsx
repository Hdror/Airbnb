import React from 'react'

// SVG
import search from '../assest/svg/app-header/search.svg'

// COMPONENTS
import { DateRange } from './date-range.jsx'



export class TripFilter extends React.Component {
    state = {
        dateRangeModal: false,
    }

    toggleDateRange = () => {
        this.setState({ dateRangeModal: !this.state.dateRangeModal })
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState((prevState) => ({
            tripOrder: { ...prevState.tripOrder, [field]: value },
        }))
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
                                    type="text"
                                    aria-autocomplete="none"
                                    autoCorrect="off"
                                    name="quary"
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
                                <div className="img-container flex"><div></div><img className="search-btn-img" src={search} alt="" /> </div>
                            </div>
                        </div>
                    </div>
                </form>}
                {isMiniHeader && <div className="mini-header-content">
                    {"Location"}
                </div>}
                {dateRangeModal && <DateRange setDates={this.setDates} />}
            </div>
        )
    }
}