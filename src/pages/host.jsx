import React from "react"

// STORE
import { connect } from 'react-redux'
import { loadOrders } from '../store/order/order.actions.js'
import { loadStays } from '../store/stay.action.js'
import { update, login } from '../store/user.actions.js'

// COMPONENTS
import { HostStays } from '../cmps/hosts-stays.jsx'
import { HostOrders } from '../cmps/host-orders.jsx'
import { StayEdit } from '../cmps/stay-edit.jsx'

class _HostPage extends React.Component {
    state = {
        infoToDisplay: "orders",
        superGuest: {
            email: 'guestHost@gmail.com',
            fullname: 'Super Guest',
            phonenumber: '054-0070077',
        },
        isGuestHostModalOpen: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadStays()
        if (!this.props.user) {
            this.props.login(this.state.superGuest)
            this.toggleGuestHost()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user && this.props.user && !this.props.user.isHost) {
            console.log(this.props.user.isHost);
            if (!this.props.user.isHost) {
                this.props.update({ ...this.props.user, isHost: true })
            }
        }
    }

    toggleGuestHost = () => {
        clearTimeout(this.timeoutId)
        this.setState({ isGuestHostModalOpen: this.state.isGuestHostModalOpen ? false : true })
        this.timeoutId = setTimeout(() => {
            this.setState({ isGuestHostModalOpen: false })
        }, 9000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }


    infoToDisplay = (val) => {
        this.setState({ infoToDisplay: val })
    }

    render() {
        const { infoToDisplay } = this.state
        return (this.props.user &&
            <div className="host-page page main-container">
                {this.state.isGuestHostModalOpen && <div className="guest-host-modal flex">
                    <div className="guest-modal-content">
                        <p>Greetings!</p>
                        <p>You have been granted "Guest Host" credentials.</p>
                        <p>You can now add stays and orders.</p>
                        <p>In addition, you can add places to your Wishlist.</p>
                        <p>Enjoy!</p>
                    </div>
                    <div onClick={this.toggleGuestHost}>Close</div>
                </div>}
                <div className="host-page-nav">
                    <div className={infoToDisplay === "orders" ? "btn-active" : "btn"} onClick={() => { this.infoToDisplay("orders") }}>My Orders</div>
                    <div className={infoToDisplay === "stays" ? "btn-active" : "btn"} onClick={() => { this.infoToDisplay("stays") }}>My Stays</div>
                    <div className={infoToDisplay === "add" ? "btn-active" : "btn"} onClick={() => { this.infoToDisplay("add") }}>Add Stay</div>
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
    update,
    login
}

export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)