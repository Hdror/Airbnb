import React from "react"
import { connect } from "react-redux"
import { orderService } from "../services/order.service.js"
import { loadOrders } from "../store/order/order.actions.js"

import { utilService } from "../services/util.service.js";


class _Orders extends React.Component {
    state = {}

    componentDidMount() {
        this.props.loadOrders()
    }

    render() {
        const { orders } = this.props
        console.log(orders);
        if (!orders.length) return <h1 className="page main-container">Loading</h1>
        return <ul className="page main-container">
            {orders.map((order, idx) => {
                return <li key={idx}> Order saved at {order.stay.name} From {utilService.formattedDates(order.startDate)}, to {utilService.formattedDates(order.endDate)}, for {order.guests.adults} adults and {order.guests.children} children, at the price of ${order.stay.price} <img src={order.image} alt="" />
                </li>
            })}
        </ul>
    }
}

const mapDispatchToProps = {
    loadOrders,
}

function mapStateToProps({ orderModule }) {
    return {
        orders: orderModule.orders,
        //   filterBy: stayModule.filterBy
    }
}


export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)
