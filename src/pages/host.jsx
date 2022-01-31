import React from "react"

// STORE
import { connect } from 'react-redux'
import { loadOrders } from '../store/order/order.actions.js'
import { loadStays } from '../store/stay.action.js'
import { update } from '../store/user.actions.js'

// COMPONENTS
import { HostStays } from '../cmps/hosts-stays.jsx'
import { HostOrders } from '../cmps/host-orders.jsx'
import { StayEdit } from '../cmps/stay-edit.jsx'

class _HostPage extends React.Component {
    state = {
        infoToDisplay: "orders"
    }

    infoToDisplay = (val) => {
        this.setState({ infoToDisplay: val })
    }

    render() {
        if (!this.props.user) {
            this.props.history.push('/')
            return <div>Loading</div>
        }
        if (!this.props.user.isHost) {
            this.props.update({ ...this.props.user, isHost: true })
        }

        return (
            <div className="page main-container">
                <div className="host-page-nav">
                    <ul className="clear-list">
                        <li onClick={() => { this.infoToDisplay("orders") }}>
                            My Orders
                        </li>
                        <li onClick={() => { this.infoToDisplay("stays") }}>
                            My Stays
                        </li>
                        <li onClick={() => { this.infoToDisplay("add") }}>
                            Add stay
                        </li>
                    </ul>
                </div>
                {this.state.infoToDisplay === "orders" && <HostOrders />}
                {this.state.infoToDisplay === "stays" && <HostStays />}
                {this.state.infoToDisplay === "add" && <StayEdit />}
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
    loadStays,
    update
}

export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)