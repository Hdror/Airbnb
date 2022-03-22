import React from "react"
import { connect } from 'react-redux'

import { loadStays, removeStay } from '../store/stay.action.js'
import { loadOrders } from '../store/order/order.actions.js'

import { Loader } from "../cmps/loader.jsx"

class _HostStays extends React.Component {
    state = {
        orders: [],
        userStays: []
    }

    componentDidMount() {
        this.setUserStays()
        this.ordersToDisplay()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stays.length !== this.props.stays.length) {
            this.props.loadStays()
            this.setUserStays()
        }
    }


    ordersToDisplay = () => {
        const { orders, user } = this.props
        let hostOrders = orders.filter((order) => {
            return order.host._id === user._id
        })
        this.setState({ orders: hostOrders })
        return hostOrders
    }

    setUserStays = () => {
        const userStays = this.props.stays.filter(stay => stay.host._id === this.props.user._id)
        this.setState({ userStays })
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

    onRemoveStay = (stayId) => {
        this.props.removeStay(stayId)
    }

    onEditStay = (stayId) => {
        console.log(stayId);
    }

    render() {
        const { userStays } = this.state
        if (!userStays.length) return <Loader />
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
                        {userStays.map((stay, idx) => {
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
                                <td onClick={() => this.onRemoveStay(stay._id)}>
                                    Remove Stay
                                </td>
                                {/* <td onClick={() => this.onEditStay(stay._id)}>
                                    Edit
                                </td> */}
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
    loadStays,
    removeStay
}

export const HostStays = connect(mapStateToProps, mapDispatchToProps)(_HostStays)




