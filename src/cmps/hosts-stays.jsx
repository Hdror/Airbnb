import React from "react"
import { connect } from 'react-redux'

import { loadStays } from '../store/stay.action.js'
import { loadOrders } from '../store/order/order.actions.js'

// 3 TABS

// ADD STAY + EDIT
// HOST ORDERS  - WHICH STAY - DATES - NUM OF GUESTS 

class _HostStays extends React.Component {
    state = {
        orders: []
    }

    componentDidMount() {
        this.props.loadOrders()
        this.props.loadStays({ hostId: this.props.user._id })
        this.ordersToDisplay()
        console.log(this.props.user._id);
    }

    ordersToDisplay = () => {
        const { orders, user } = this.props
        let hostOrders = orders.filter((order) => {
            return order.host._id === user._id
        })
        this.setState({ orders: hostOrders })
        return hostOrders
    }

    getStayOrders = (stay) => {
        let { orders } = this.state
        orders = orders.filter(order => {
            return order.stay.name === stay.name
        })
        return orders
    }

    calculateRevenue = (stay) => {
        const orders = this.getStayOrders(stay)
        let sum = orders.reduce((acc, order) => {
            if (order.stay.name === stay.name) return acc += order.totalPrice
        }, 0)
        return sum
    }

    render() {
        const { orders, stays } = this.props
        return (
            <div className="main-container host-stay-container">
                <table>
                    <tbody>
                        <tr>
                            <th>Stay</th>
                            <th>Total number of orders</th>
                            <th>Revenue</th>
                            <th>Price</th>
                            <th>Reviews</th>
                            <th>Avg Rate</th>
                        </tr>
                        {stays.map((stay, idx) => {
                            return <tr className="host-stay-info" key={idx}>
                                <td>
                                    {stay.name}
                                </td>
                                <td>
                                    {this.getStayOrders(stay).length}
                                </td>
                                <td>
                                    $ {this.calculateRevenue(stay)}
                                </td>
                                <td>
                                    $ {stay.price} / night
                                </td>
                                <td>
                                    {stay.reviews.length}
                                </td>
                                <td>
                                    {stay.avgRate}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
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

export const HostStays = connect(mapStateToProps, mapDispatchToProps)(_HostStays)




