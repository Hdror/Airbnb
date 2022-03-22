import React from "react"

// STORE
import { connect } from 'react-redux'
import { loadStays } from '../store/stay.action.js'
import { loadOrders } from '../store/order/order.actions.js'

// SERVICES
import { utilService } from '../services/util.service.js'

// COMPONENTS
import { Loader } from '../cmps/loader.jsx'
class _HostOrders extends React.Component {

    componentDidMount() {
        this.props.loadOrders({ hostId: this.props.user._id })
        // this.props.loadStays({ hostId: this.props.user._id })
    }

    render() {
        const { stays, orders } = this.props
        if (!orders.length) return <Loader />
        return (
            <div className="main-container host-stay-container">

                {orders.map((order, idx) => {
                    return <div className="host-order-container flex" key={idx}>
                        <div className="order-box order-stay-name flex">
                            <div>{order.stay.name}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Earnings</div>
                            <div>$ {order.totalPrice}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Status</div>
                            <div>{order.status}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Reserved at</div>
                            <div>{utilService.timeConverter(order.createdAt)}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Check in</div>
                            <div>{utilService.timeConverter(order.startDate)}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Check out</div>
                            <div>{utilService.timeConverter(order.endDate)}</div>
                        </div>
                        <div className="order-box flex">
                            <div>Guests</div>
                            <div>{order.guests.adults} Adults, {order.guests.children} Children </div>
                        </div>
                    </div>
                })
                }
            </div >
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




