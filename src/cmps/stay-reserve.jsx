import React from 'react'
import { connect } from 'react-redux'

// STORE 
import { addOrder } from '../store/order/order.actions.js'

// LIBS
import { DateRange as DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file  
import 'react-date-range/dist/theme/default.css' // theme css file
// import { Calendar } from 'react-date-range';

// SERVICES
import { orderService } from '../services/order.service.js'
import { tripService } from '../services/trip.service.js'
import { utilService } from "../services/util.service.js";

// COMPONENTS
import { GuestsDropDown } from './guests-dropdown.jsx'

// SVG
import Star from '../assest/svg/app-detials/star.svg'
import Flag from '../assest/svg/app-detials/flag.svg'

class _StayReserve extends React.Component {
    state = {
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
        MenuDropDownModal: false,
        isTripCreated: false,
        guestsModal: false,
        istBtnDisabled: false,
        isStayTimePicked: false,
        totalPrice: this.props.stay.price
    }

    componentDidMount() {
        const { stay } = this.props
        tripService.query().then(trip => {
            this.setState({ trip: { ...trip, stay: { address: stay.loc.address } } })
        })
    }

    toggleGuestsModal = () => {
        this.setState({ guestsModal: !this.state.guestsModal })
    }

    onAddTrip = (ev) => {
        ev.preventDefault()
        let { trip } = this.state
        tripService.save(trip)
        this.setState({ MenuDropDownModal: false, isTripCreated: true })
    }

    toggleDisableBtn = () => {
        this.setState({ istBtnDisabled: true }, () => {
            setTimeout(() => {
                this.setState({ istBtnDisabled: false })
            }, 5000)
        })
    }

    onCreateOrder = () => {
        const { trip } = this.state
        const orderToSave = {
            hostId: this.props.stay.host._id,
            createdAt: Date.now(),
            buyer: {
                _id: this.props.user._id,
                fullname: this.props.user.fullname,
            },
            totalPrice: this.props.stay.price * (trip.stayTime.endDate - trip.stayTime.startDate) / 1000 / 60 / 60 / 24,
            startDate: trip.stayTime.startDate,
            endDate: trip.stayTime.endDate,
            guests: trip.guests,
            stay: {
                _id: this.props.stay._id,
                name: this.props.stay.name,
                price: this.props.stay.price
            },
            image: this.props.stay.imgUrls[0],
            status: 'pending'
        }
        this.props.addOrder(orderToSave)
        this.toggleDisableBtn()
        this.setState({ totalPrice: orderToSave.totalPrice })
        this.clearState()
    }

    onSetFilterBy = (filterBy) => {
        this.props.setFilterBy(filterBy)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadStays(this.props.filterBy)
        }
    }


    toggleMenuDropDownModal = () => {
        this.setState({ MenuDropDownModal: !this.state.MenuDropDownModal })
    }

    handleSelect = (ranges) => {
        const { trip } = this.state
        let startDate = ranges.selection.startDate.getTime()
        let endDate = ranges.selection.endDate.getTime()
        this.setState((prevState) => ({
            trip: { ...prevState.trip, stayTime: { startDate: startDate, endDate: endDate } }
        }))
        this.setState({ MenuDropDownModal: false, isStayTimePicked: this.state.isStayTimePicked = true, totalPrice: this.props.stay.price * (endDate - startDate) / 1000 / 60 / 60 / 24 })
    }
    clearState = () => {
        this.setState({ trip: { stayTime: { startDate: '', endDate: '', }, guests: { adults: 1, children: 0 }, stay: { address: '' } }, totalPrice: this.props.stay.price })
    }

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

    onHandleChange = ({ target }) => {
        const { trip } = this.state
        const value = target.type === 'number' ? +target.value : target.value
        if (value < 1) return
        this.setState((prevState) => ({
            trip: { ...prevState.trip, guests: { adults: value, children: trip.guests.children } }
        }))
    }

    getCells() {
        const cells = []
        for (let i = 0; i < 100; i++) {
            cells.push(<div key={`cell-${i}`} className="cell"></div>)
        }
        return cells
    }

    render() {
        const { MenuDropDownModal, isTripCreated, trip, guestsModal } = this.state
        const { guests, stayTime } = trip
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
        console.log(trip)
        console.log(stayTime);

        return <main>
            <section className="order-container">
                <div className="order-form-header">
                    <p><span className="cost">${this.state.isStayTimePicked ? this.state.totalPrice : this.props.stay.price}</span> / night</p>
                    <p> <img src={Star} alt="" /> 4.38 <span className="dot">· </span><span className="reviews">(4 reviews)</span></p>
                </div>

                <div className="order-data">
                    <div className="date-picker">
                        <div className="date-input">
                            <label onClick={this.toggleMenuDropDownModal}>CHECK-IN</label>
                            <input onChange={this.handleSelect} value={utilService.formattedDates(stayTime.startDate)} name="stayTime" placeholder="Add date"></input>
                            <div>{trip.startDate}</div>
                        </div>
                        <div className="date-input">
                            <label onClick={this.toggleMenuDropDownModal}>CHECKOUT</label>
                            <input onChange={this.handleSelect} value={utilService.formattedDates(stayTime.endDate)} name="stayTime" placeholder="Add date"></input>
                            <div>{trip.endDate}</div>
                        </div>
                    </div>
                    <div className="guest-input" onClick={this.toggleGuestsModal}>
                        <label>GUESTS</label>
                        <input readOnly value={trip.guests.adults + trip.guests.children} name="guests" onChange={this.onHandleChange} placeholder="1 guest"></input>
                    </div>
                </div>
                {isTripCreated ?
                    <div onClick={this.onCreateOrder} className={this.state.istBtnDisabled ? "btn-container disabled" : "btn-container"}>
                        {this.getCells()}
                        <div className="content">
                            <button className="action-btn" >
                                <span>Reserve</span>
                            </button>
                        </div>
                    </div>
                    : <div onClick={this.onAddTrip} className="btn-container">
                        {this.getCells()}
                        <div className="content">
                            <button className="action-btn" >
                                <span>Check availability</span>
                            </button>
                        </div>
                    </div>
                }
            </section>
            <p className="footer"> <img src={Flag} alt="" /> <a href="#">Report this listing</a></p>
            <div className='date-range-container'>
                {MenuDropDownModal && <DateRangePicker
                    className="date-range-calender"
                    appearance="default"
                    placeholder="Default"
                    ranges={[selectionRange]}
                    months={2}
                    direction="horizontal"

                    date={new Date()}
                    onChange={this.handleSelect}
                    moveRangeOnFirstSelection={true}
                    hasCustomRendering={false}
                />}
            </div>
            {guestsModal && <div>
                <GuestsDropDown
                    guests={guests}
                    updateNumOfGuests={this.updateNumOfGuests} />
            </div>}
        </main>
    }
}

function mapStateToProps(state) {
    return {
        order: state.orderModule.order,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    addOrder,
}

export const StayReserve = connect(mapStateToProps, mapDispatchToProps)(_StayReserve)