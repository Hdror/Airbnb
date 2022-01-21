import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

// import { loadStays } from '../store/stay.action.js'

// SVG
import menu from '../assest/svg/app-header/menu.svg'
// import { DateRange } from './date-range.jsx'

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
        loggedInUser: null
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
            }
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

    // <DateRange setDates={this.setDates} /> 

    // TODO - if user is host - instead of become a host

    render() {
        return (
            <header className="main-container">
                <div className="main-header flex">
                    <Link to="/" className="logo">LOGO</Link>
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
                        <div>
                            <div>
                                <div className="flex">
                                    <div className="flex">
                                        <label htmlFor="trip-location">
                                            <div className="trip-selections">Location</div>
                                            <input className="search-input trip-instructions"
                                                type="text"
                                                aria-autocomplete="none"
                                                autoCorrect="off"
                                                name="quary"
                                                placeholder="Where are  you going?"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div className="flex">
                                    <div className="flex">
                                        <div className="trip-selections">Check in</div>
                                        <div className="trip-instructions">Add dates</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                    <div className="flex">
                                        <div className="trip-selections">Check out</div>
                                        <div className="trip-instructions">Add dates</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex">
                                <div className="flex">
                                    <div className="trip-selections">Guests</div>
                                    <div className="trip-instructions">Add guests</div>
                                </div>
                            </div>
                            <div className="flex">
                                <button>
                                    <div>
                                        <div><img src="https://iconpacks.net/?utm_source=link-attribution&utm_content=2906" alt="" /> </div>
                                        <div>Search</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
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