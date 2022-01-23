import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// STORE
import { connect } from 'react-redux'
// import { loadStays } from '../store/stay.action.js'

// COMPONENT
import { TripFilter } from './trip-filter.jsx'
import { MenuDropDown } from './app-dropdown-menu.jsx'

// SVG
import menu from '../assest/svg/app-header/menu.svg'
import logo from '../assest/svg/app-header/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'


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
        MenuDropDownModal: false,
        isMiniHeader: false
    }
    // STORE FOR APP LAYOUT - HOLDING CURRPAGE AND MINI HEADER (FOR NOW)

    componentDidMount() {
        window.addEventListener("scroll", this.checkScrollY)
    }

    checkScrollY = ({ target }) => {
        const { scrollTop } = target.scrollingElement
        if (scrollTop > 50 && this.state.isMiniHeader || scrollTop < 50 && !this.state.isMiniHeader) return
        if (scrollTop > 50) {
            this.setState({ isMiniHeader: true })
        } else {
            this.setState({ isMiniHeader: false })
        }
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

    toggleMenuDropDownModal = () => {
        this.setState({ MenuDropDownModal: !this.state.MenuDropDownModal })
        console.log();
    }


    // TODO - if user is host - instead of become a host

    render() {
        const { MenuDropDownModal, isMiniHeader } = this.state
        return (
            <header className={isMiniHeader ? "main-container mini-header" : "main-container"}>
                <div>
                    <div className="main-header flex">
                        <Link className="site-logo-name clean-link" to="/">
                            <div className="logo-container flex">
                                {/* <img className="logo" src={logo} alt="" /> */}
                                <FontAwesomeIcon className="logo" icon={faAirbnb} />
                                <h2>somthingBnb</h2>
                            </div>
                        </Link>
                        <div className="menu-actions flex">
                            <NavLink className="clean-link" to="/stay">Explore</NavLink>
                            <NavLink className="clean-link" to="/host">Become a host</NavLink>
                            <div className="menu-wrapper flex">
                                <img className="menu-icon" src={menu} alt="" onClick={this.toggleMenuDropDownModal} />
                                <img className="user-icon" src="https://randomuser.me/api/portraits/women/95.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <TripFilter isMiniHeader={isMiniHeader} />
                </div>
                {MenuDropDownModal && <MenuDropDown />}
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