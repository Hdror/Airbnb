import React from "react"

// STORE
import { connect } from 'react-redux'
import { loadStays } from '../store/stay.action.js'
import { loadOrders } from '../store/order/order.actions.js'

// SERVICES
import { utilService } from '../services/util.service.js'


// 3 TABS

// ADD STAY + EDIT
// HOST STAYS - TABLE WITH STAYS (INFO REVENUE NUM OR ORDERS, number of pending orders,)
// HOST ORDERS  - WHICH STAY - DATES - NUM OF GUESTS 

class _HostOrders extends React.Component {

    componentDidMount() {
        this.props.loadOrders({ hostId: this.props.user._id })
        this.props.loadStays({ hostId: this.props.user._id })
    }

    render() {
        const { stays, orders } = this.props
        console.log(orders)
        if (!orders.length) return <div>Loading</div>
        return (
            <div className="main-container host-stay-container">
                {orders.map((order, idx) => {
                    return <ul className="clean-list order" key={idx}>
                        <h1>Order {idx + 1}</h1>
                        <li>Stay : {order.stay.name}</li>
                        <li>Price :  $ {order.stay.price} / night </li>
                        <li>Earnings : $ {order.totalPrice}</li>
                        <li>Status : {order.status}</li>
                        <li>Created at : {utilService.timeConverter(order.createdAt)}</li>
                        <li>Check in : {utilService.timeConverter(order.startDate)}</li>
                        <li>Check out : {utilService.timeConverter(order.endDate)}</li>
                        <li>Guests : {order.guests.adults} Adults, {order.guests.children} Children</li>
                    </ul>
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders,
        stays: state.stayModule.stays
    }
}

const mapDispatchToProps = {
    loadOrders,
    loadStays
}

export const HostOrders = connect(mapStateToProps, mapDispatchToProps)(_HostOrders)




