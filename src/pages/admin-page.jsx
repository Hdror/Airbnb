import React from 'react'
import { connect } from 'react-redux'
import { Graph } from '../cmps/stat-graph.jsx'

import { orderService } from '../services/order.service.js'

export class _AdminPage extends React.Component {

    state = {
        statistics: [],
        isStatByStay: false,
        city: null
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.user.isAdmin) return this.props.history.push('/')
        this.setStatistics()
    }

    setStatistics = async (city) => {
        const isStatByStay = (city) ? true : false
        const statistics = (city) ? await orderService.getStatisticsByCity(city) : await orderService.getStatistics()
        this.setState({ statistics, isStatByStay, city: city || null })
    }

    render() {
        const { statistics, isStatByStay, city } = this.state
        return <div className="admin-page page main-container">
            <div className="admin-page-container">
                <div><h1 >Admin Panel</h1></div>
                {isStatByStay && <div className="back-btn" onClick={()=>this.setStatistics()}>Back</div>}
                {!!statistics.length &&
                    <Graph statistics={statistics} setStatistics={this.setStatistics} isStatByStay={isStatByStay} city={city} />
                }
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {

}

export const AdminPage = connect(mapStateToProps, mapDispatchToProps)(_AdminPage)
