import React from "react";
import { connect } from "react-redux";
import { TripFilter } from './trip-filter.jsx'
import { MenuDropDown } from './app-dropdown-menu.jsx'
import { DateRange as DateRangePicker } from 'react-date-range'
import { GuestDropDown } from "./guest-dropdown-menu.jsx";
import { Calendar } from 'react-date-range';
import { orderService } from '../services/order.service.js'
// import { DateRangePicker } from 'react-date-range';


import { tripService } from "../services/trip.service.js"
import { addTrip, loadTrips, removeTrip } from "../store/trip/trip.action.js"


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
        // console.log('props', this.props);
        this.props.loadTrips()
        this.setState({ trip: { ...this.state.trip, stay: { address: stay.loc.address } } })
    }

    onRemoveTrip = stayId => {
        this.props.removeTrip(stayId);
    };

    onAddTrip = (ev) => {
        console.log('Saved');
        ev.preventDefault()
        let { trip } = this.state
        console.log(trip);
        tripService.save(trip)
        // this.props.addTrip(trip)
        this.setState({ MenuDropDownModal: false, isTripCreated: true })

    }

    onCreateOrder = () => {
        console.log('stateBefore', this.state);
        const { trip } = this.state
        orderService.createOrder(trip)
        this.clearState()


    }


    onSetFilterBy = (filterBy) => {
        this.props.setFilterBy(filterBy);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadStays();
        }
    }


    toggleMenuDropDownModal = () => {
        this.setState({ MenuDropDownModal: !this.state.MenuDropDownModal })
    }

    handleSelect = (ranges) => {
        console.log(ranges);
        const { trip } = this.state

        this.setState((prevState) => ({
            trip: { ...prevState.trip, stayTime: { startDate: ranges.selection.startDate, endDate: ranges.selection.endDate } }
            // , stayTime: { [field]: value }    
        }))
        this.setState({ MenuDropDownModal: false })

        // const { startDate, endDate } = ranges.selection
        // this.setState({ startDate, endDate }, () => {
        //     this.props.setDates(startDate, endDate)
        // });
    };

    clearState = () => {
        console.log('stateAfter', this.state);
        this.setState({ trip: { stayTime: { startDate: '', endDate: '', }, guests: { adults: 1, children: 0 }, stay: { address: '' } } }, () => { console.log('after', this.state) })
    }




    onHandleChange = ({ target }) => {
        const { trip } = this.state
        const { stay } = this.props

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (value < 1) return
        this.setState((prevState) => ({
            trip: { ...prevState.trip, guests: { adults: value, children: trip.guests.children } }
            // , stayTime: { [field]: value }    
        }))
        // console.log(this.state);
    }

    getCells() {
        const cells = []
        for (let i = 0; i < 100; i++) {
            cells.push(<div key={`cell-${i}`} className="cell"></div>)
        }
        return cells
    }

    render() {
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
                            <input onChange={this.handleSelect} value={trip.stayTime.startDate} name="stayTime" placeholder="Add date"></input>

                        </div>
                        <div className="date-input">
                            <label onClick={this.toggleMenuDropDownModal}>CHECKOUT</label>
                            <input onChange={this.handleSelect} value={trip.stayTime.endDate} placeholder="Add date"></input>
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

                // retainEndDateOnFirstSelection={true}
                // showMonthAndYearPickers={false}
                // showDateDisplay={false}
                // onShownDateChange={true}


                />}
            </div>


        </main>
    }

}

function mapStateToProps(state) {
    return {
        // stay: state.stayModule.stays,
        // trip: state.tripModule.trip,
        // filterBy: state.tripModule.filterBy,
        //user: state.userModule.user

    }
}

const mapDispatchToProps = {
    addTrip,
    loadTrips,
    removeTrip,
    // updateStay,
    // setFilterBy
}

export const StayReserve = connect(mapStateToProps, mapDispatchToProps)(_StayReserve)