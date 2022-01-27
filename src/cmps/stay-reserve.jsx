import React from "react";
import { connect } from "react-redux";
import { TripFilter } from './trip-filter.jsx'
import { MenuDropDown } from './app-dropdown-menu.jsx'
import { DateRange as DateRangePicker } from 'react-date-range'
import { GuestDropDown } from "./guest-dropdown-menu.jsx";
import { Calendar } from 'react-date-range';
import { orderService } from '../services/order.service.js'
import { utilService } from "../services/util.service.js";


import { tripService } from "../services/trip.service.js"
import { addTrip, loadTrips, removeTrip } from "../store/trip/trip.action.js"
import { addOrder } from "../store/order/order.actions.js"


import Star from "../assest/svg/app-detials/star.svg"
import Flag from "../assest/svg/app-detials/flag.svg"

class _StayReserve extends React.Component {
    state = {
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
        MenuDropDownModal: false,
        isTripCreated: false
    }

    componentDidMount() {
        const { stay } = this.props
        console.log('Stay', stay);
        this.props.loadTrips()
        this.setState({ trip: { ...this.state.trip, stay: { address: stay.loc.address } } })
    }

    onRemoveTrip = stayId => {
        this.props.removeTrip(stayId);
    };

    onAddTrip = (ev) => {
        ev.preventDefault()
        let { trip } = this.state
        tripService.save(trip)
        this.setState({ MenuDropDownModal: false, isTripCreated: true })

    }

    onCreateOrder = () => {
        const { trip } = this.state
        // orderService.save(trip)
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

        this.clearState()


    }


    onSetFilterBy = (filterBy) => {
        this.props.setFilterBy(filterBy);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadStays(this.props.filterBy);
        }
    }


    toggleMenuDropDownModal = () => {
        this.setState({ MenuDropDownModal: !this.state.MenuDropDownModal })
    }

    handleSelect = (ranges) => {
        const { trip } = this.state
        // console.log(ranges.selection.startDate.getTime());
        let startDate = ranges.selection.startDate.getTime()
        let endDate = ranges.selection.endDate.getTime()
        // console.log(startDate);

        this.setState((prevState) => ({
            trip: { ...prevState.trip, stayTime: { startDate: startDate, endDate: endDate } }
        }))
        this.setState({ MenuDropDownModal: false })

    };

    clearState = () => {
        this.setState({ trip: { stayTime: { startDate: '', endDate: '', }, guests: { adults: 1, children: 0 }, stay: { address: '' } } })
    }




    onHandleChange = ({ target }) => {
        const { trip } = this.state
        const { stay } = this.props

        const field = target.name
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
        console.log(this.props.stay);

        const { MenuDropDownModal, isTripCreated, trip } = this.state
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
        return <main>
            <section className="order-container">
                <div className="order-form-header">
                    <p><span className="cost">$150</span> / night</p>
                    <p> <img src={Star} alt="" /> 4.38 <span className="dot">· </span><span className="reviews">(4 reviews)</span></p>
                </div>

                <div className="order-data">
                    <div className="date-picker">
                        <div className="date-input">
                            <label onClick={this.toggleMenuDropDownModal}>CHECK-IN</label>
                            <input onChange={this.handleSelect} value={utilService.formattedDates(trip.stayTime.startDate)} name="stayTime" placeholder="Add date"></input>

                        </div>
                        <div className="date-input">
                            <label onClick={this.toggleMenuDropDownModal}>CHECKOUT</label>
                            <input onChange={this.handleSelect} value={utilService.formattedDates(trip.stayTime.endDate)} placeholder="Add date"></input>
                        </div>
                    </div>
                    <div className="guest-input">
                        <label>GUESTS</label>
                        <input type="number" value={trip.guests.adults + trip.guests.children} name="guests" onChange={this.onHandleChange} placeholder="1 guest"></input>
                    </div>
                </div>
                {isTripCreated ?
                    <div onClick={this.onCreateOrder} className="btn-container">
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
                    direction='horizontal'

                    date={new Date()}
                    onChange={this.handleSelect}
                    moveRangeOnFirstSelection={true}
                    hasCustomRendering={false}


                />}
            </div>


        </main>
    }

}

function mapStateToProps(state) {
    return {
        // stay: state.stayModule.stays,
        // trip: state.tripModule.trip,
        order: state.orderModule.order,
        // filterBy: state.tripModule.filterBy,
        user: state.userModule.user


    }
}

const mapDispatchToProps = {
    addTrip,
    loadTrips,
    removeTrip,
    addOrder,

}

export const StayReserve = connect(mapStateToProps, mapDispatchToProps)(_StayReserve)