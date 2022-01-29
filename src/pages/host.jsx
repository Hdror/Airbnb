import React from "react"
import { connect } from 'react-redux'

import { loadOrders } from '../store/order/order.actions.js'
import { loadStays } from '../store/stay.action.js'

import { HostStays } from '../cmps/hosts-stays.jsx'
import { HostOrders } from '../cmps/host-orders.jsx'


// 3 TABS

// ADD STAY + EDIT
// HOST STAYS - TABLE WITH STAYS (INFO REVENUE NUM OR ORDERS)
// HOST ORDERS  - WHICH STAY - DATES - NUM OF GUESTS 
class _HostPage extends React.Component {
    state = {
        infoToDisplay: "orders"
    }

    infoToDisplay = (val) => {
        this.setState({ infoToDisplay: val })
    }

    render() {
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

export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)