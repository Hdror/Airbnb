import React from "react"
import { connect } from "react-redux"

// SERVICES
import { utilService } from "../services/util.service.js"

// STORE
import { loadOrders } from "../store/order/order.actions.js"

class _Orders extends React.Component {
    state = {}

    componentDidMount() {
        this.props.loadOrders()
        console.log(this.props.user)
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
        const ordersToShow = this.ordersToDisplay()
        const host = this.hostDetails()
        console.log('orders', orders)
        console.log('ordersToShow', ordersToShow)
        if (!orders.length) return <h1 className="page main-container">Loading</h1>
        return (
            <section className="page main-container">
                <div>
                    <div className="orders-user-img"><img src={user.imgUrl} alt="" /></div>
                    <h2>Hi! {user.fullname}</h2>
                </div>
                <div>
                    {ordersToShow.map((order, idx) => {
                        return (
                            <div key={idx}>
                                <div>
                                    <div>Status : {order.status}</div>
                                    <img src={order.image} alt="" />
                                </div>
                                <div>
                                    <div>{order.stay.name}</div>
                                    <div>Host : {host}</div>
                                    <div>Dates : {utilService.formattedDates(order.startDate)}-{utilService.formattedDates(order.endDate)}</div>
                                    <div>Guests : {order.guests.adults} adults and {order.guests.children} children</div>
                                    <div>Earnings : ${order.totalPrice} </div>
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
