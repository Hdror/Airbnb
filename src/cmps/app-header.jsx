import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// STORE
import { connect } from 'react-redux'
// import { loadStays } from '../store/stay.action.js'

// COMPONENT
import { DateRange } from './date-range.jsx'

// SVG
import menu from '../assest/svg/app-header/menu.svg'
import logo from '../assest/svg/app-header/logo.svg'
import search from '../assest/svg/app-header/search.svg'


class _AppHeader extends React.Component {
    state = {
        tripCity: '',
        filterBy: {
            city: ''
        },
        tripOrder: {
            checkIn: '',
            checkOut: '',
            tripGuests: {
                adults: 0,
                children: 0
            }
        },
        loggedInUser: null,
        dateRangeModal: false
    }

    getFormattedDates = (selectedDate) => {
        if (!selectedDate) return 'Dates Required'
        const date = new Date(selectedDate)
        return date.toLocaleDateString("en-GB")
    }

    clearState = () => {
        const clearedState = {
            filterBy: {
                city: ''
            },
            tripOrder: {
                checkIn: '',
                checkOut: '',
                tripGuests: {
                    adults: 0,
                    children: 0
                }
            },
        }
        this.setState({ ...clearedState })
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState((prevState) => ({
            tripOrder: { ...prevState.tripOrder, [field]: value },
        }))
    }

    toggleDateRange = () => {
        this.setState({ dateRangeModal: !this.state.dateRangeModal })
    }

    // TODO - if user is host - instead of become a host

    render() {
        const { dateRangeModal } = this.state
        return (
            <header className="main-container">

                <div className="main-header flex">
                    <Link className="site-logo-name clean-link" to="/">
                        <div className="logo-container flex">
                            <img className="logo" src={logo} alt="" /><h2>SomthingBnb</h2>
                        </div>
                    </Link>

                    <div className="menu-actions flex">
                        <NavLink className="clean-link" to="/stay">Explore</NavLink>
                        <NavLink className="clean-link" to="/host">Become a host</NavLink>
                        <div className="menu-wrapper flex">
                            <img className="menu-icon" src={menu} alt="" />
                            <img src="https://randomuser.me/api/portraits/women/95.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="trip-build-container flex">
                    <form action="">
                        <div className="trip-location-selector flex">
                            <label htmlFor="trip-location">
                                <div className="trip-destination flex">Location
                                    <input className="search-input trip-instructions"
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
                            <div className="trip-selections flex" onClick={this.toggleDateRange}>
                                <div>Check in</div>
                                <div>Add dates</div>
                            </div>

                            <div className="trip-selections flex" onClick={this.toggleDateRange}>
                                <div>Check out</div>
                                <div>Add dates</div>
                            </div>

                            <div className="search-btn-container flex">
                                <div className="trip-selections flex">
                                    <div>Guests</div>
                                    <div>Add guests</div>
                                </div>
                                <div className="search-btn flex">
                                    <div className="img-container flex"><div></div><img className="search-btn-img" src={search} alt="" /> </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {dateRangeModal && <DateRange setDates={this.setDates} />}
            </header >
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}
const mapDispatchToProps = {

}

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader)