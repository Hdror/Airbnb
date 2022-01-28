import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// STORE
import { connect } from 'react-redux'

// COMPONENT
import { TripFilter } from './trip-filter.jsx'
import { MenuDropDown } from './app-dropdown-menu.jsx'
import {GuestsModal} from './guests-dropdown.jsx'
// SVG
import menu from '../assest/svg/app-header/menu.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'


class _AppHeader extends React.Component {
    state = {
        loggedInUser: null,
        MenuDropDownModal: false,
        isMiniHeader: false
    }
    // STORE FOR APP LAYOUT - HOLDING CURRPAGE AND MINI HEADER (FOR NOW)

    componentDidMount() {
        window.addEventListener("scroll", this.checkScrollY)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.checkScrollY)
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
    }

    onSetFilter = (filterBy) => {
        this.props.setFilter(filterBy)
    }

    get pageClass() {
        return this.props.currPage
    }

    get miniHeaderClass() {
        return this.state.isMiniHeader ? "main-container mini-header" : "main-container"
    }

    render() {
        const { MenuDropDownModal, isMiniHeader } = this.state
        const { user } = this.props
        return (
            <header className={`${this.miniHeaderClass} ${this.pageClass}`} >
                <div>
                    <div className="main-header flex">
                        <Link className="site-logo-name clean-link" to="/">
                            <div className="logo-container flex">
                                <FontAwesomeIcon className="logo" icon={faAirbnb} />
                                <h2>Bnb</h2>
                            </div>
                        </Link>
                        <div className="menu-actions flex">
                            <NavLink className="clean-link" to="/stay">Explore</NavLink>
                            <NavLink className="clean-link" to="/host">Become a host</NavLink>
                            <div className="menu-wrapper flex">
                                <img className="menu-icon" src={menu} alt="" onClick={this.toggleMenuDropDownModal} />
                                {!user && <img className="user-icon" src="https://randomuser.me/api/portraits/women/95.jpg" alt="" />}
                                {user &&<img className="user-icon" src={user.imgUrl} alt="" />}
                            </div>
                            {MenuDropDownModal && <MenuDropDown />}
                        </div>
                    </div>
                    <TripFilter isMiniHeader={isMiniHeader} />
                </div>
            </header >
        )
    }
}

function mapStateToProps(state) {
    return {
        currPage: state.pageModule.currPage,
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
}

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader)