import React from "react"
import { connect } from 'react-redux'

import { loadStays } from '../store/stay.action.js'
import { loadOrders } from '../store/order/order.actions.js'

// 3 TABS

// ADD STAY + EDIT
// HOST STAYS - TABLE WITH STAYS (INFO REVENUE NUM OR ORDERS, number of pending orders,)
// HOST ORDERS  - WHICH STAY - DATES - NUM OF GUESTS 

class _HostOrders extends React.Component {
    // state = {
    //     orders: []
    // }

    componentDidMount() {
        this.props.loadOrders({ hostId: this.props.user._id })
        this.props.loadStays({ hostId: this.props.user._id })
    }

    // ordersToDisplay = () => {
    //     const { orders, user } = this.props
    //     console.log('orders', orders);
    //     console.log('user', user);
    //     const hostOrders = orders.filter((order) => {
    //         return order.host._id === user._id
    //     })
    //     this.setState({ orders: hostOrders })
    // }

    // getStayOrders = (stay) => {
    //     let { orders } = this.state
    //     orders = orders.filter(order => {
    //         return order.stay.name === stay.name
    //     })
    //     return orders
    // }

    calculateRevenue = (stay) => {
        const orders = this.getStayOrders(stay)
        let sum = orders.reduce((acc, order) => {
            if (order.stay.name === stay.name) return acc += order.totalPrice
        }, 0)
        return sum
    }


    render() {
        const { stays, orders } = this.props
        if (!orders.length) return <div>Loading</div>
        return (
            <div className="main-container host-stay-container">
                {orders.map((order, idx) => {
                    <div key={idx}>
                        <div>{order.createdAt}</div>
                    </div>
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




