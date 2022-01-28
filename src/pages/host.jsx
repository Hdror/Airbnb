import React from "react"
import { connect } from 'react-redux'

class _HostPage extends React.Component {
    state = {
        host: this.props.user,
        orders: [],

    }

    ordersToDisplay = () => {
        const { orders } = this.props
        let hostOrders = orders.filter((order) => {
            return order.hostId === this.state.host._id
        })

        console.log('Host Orders', hostOrders);


    }

    componentDidMount() {
        console.log(this.props);

    }

    render() {
        return <div className="page main-container">Host Page
            <button onClick={this.ordersToDisplay}>Orders</button>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders,
        stays: state.stayModule.stays
        // user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    // loadUsers,

}


export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)