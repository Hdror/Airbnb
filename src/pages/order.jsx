import React from "react"
import { connect } from "react-redux"

// SERVICES
import { utilService } from "../services/util.service.js"

// STORE
import { loadOrders } from "../store/order/order.actions.js"

class _Orders extends React.Component {
    state = {}

    componentDidMount() {
        this.props.loadOrders({ buyerId: this.props.user._id })
    }

    ordersToDisplay = () => {
        const { orders, user } = this.props
        const ordersToShow = orders.filter(order => {
            return order.buyer._id === user._id
        })
        return ordersToShow
    }

    hostDetails = () => {
        const { orders } = this.props
        const hosts = orders.map(order => {
            return order.host.fullname
        })
        return hosts
    }

    render() {
        const { orders, user } = this.props

        if (!orders.length) return <h1 className="page main-container">Loading</h1>
        return (
            <section className="page main-container">
                <div className="user-details flex">
                    <div className="orders-user-img">
                        <img src={user.imgUrl} alt="" />
                    </div>
                    <h2>Hi! {user.fullname}</h2>
                </div>
                <div className="user-order-container">
                    {orders.map((order, idx) => {
                        return (
                            <div className="order-info-container" key={idx}>
                                <div className="order-img-container">
                                    <img src={order.image} alt="" />
                                </div>
                                <div className="order-info-details">
                                    <div>Status : {order.status}</div>
                                    <div>{order.stay.name}</div>
                                    <div>Host : {order.host.fullname}</div>
                                    <div>Dates : {utilService.formattedDates(order.startDate)}-{utilService.formattedDates(order.endDate)}</div>
                                    <div>Guests : {order.guests.adults} adults and {order.guests.children} children</div>
                                    <div>$ {order.stay.price} / night </div>
                                    <div>Total price : ${order.totalPrice}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = {
    loadOrders,
}

function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders,
        user: state.userModule.user
    }
}

export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)
