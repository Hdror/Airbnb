import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadStays } from '../store/stay.action.js'
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
            <section>
                <header>
                    <div><Link to="/" className="logo">LOGO</Link></div>
                    <div>
                        <NavLink className="clean-link" to="/stay">Explore</NavLink>
                        <NavLink className="clean-link" to="/stay">Become a host</NavLink>
                    </div>
                    <div>
                        <span>SVG</span>
                        <img src="https://randomuser.me/api/portraits/women/95.jpg" alt="" />
                    </div>
                </header>
            </section>
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