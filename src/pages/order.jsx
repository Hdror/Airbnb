import React from "react"
import { Link } from 'react-router-dom'

// STORE
import { connect } from "react-redux"
import { loadOrders } from "../store/order/order.actions.js"
import { changePage } from '../store/page.action.js'

// COMPONENTS
import { Loader } from "../cmps/loader.jsx"


class _Orders extends React.Component {
    state = {}

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('order')
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
    formattedDate = (timestamp) => {
        const d = new Date(timestamp);
        const date = d.toDateString();
        return date
    }

    render() {
        const { orders, stays } = this.props
        if (!orders.length) return <Loader/>
        return (
            <section className="page main-container">
                <div className="user-order-container">
                    <h3>Orders</h3>
                    <div className="order-list-headlines flex">
                        <div>Stay</div>
                        <div>Check in</div>
                        <div>Check out</div>
                        <div>Guests</div>
                        <div className="user-order-price">Price</div>
                        <div>Status</div>
                    </div>
                    <div>
                        {orders.map((order, idx) => {
                            return (
                                <Link to={`/stay/${order.stay._id}`} className="clean-link" key={idx}><div className="user-order-card flex">
                                    <p className="user-order-div">{order.stay.name}</p>
                                    <p className="user-order-div">{this.formattedDate(order.startDate)}</p>
                                    <p className="user-order-div">{this.formattedDate(order.endDate)}</p>
                                    <p className="user-order-div">{order.guests.adults} Adults & {order.guests.children} children</p>
                                    <p className="user-order-price user-order-div">$ {order.totalPrice}</p>
                                    <p className="user-order-div">{order.status}</p>
                                </div></Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = {
    loadOrders,
    changePage
}

function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders,
        user: state.userModule.user,
        stays: state.stayModule.stays,

    }
}

export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)




