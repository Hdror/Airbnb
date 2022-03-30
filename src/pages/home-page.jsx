import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { changePage } from '../store/page.action.js'
import { StayApp } from './stay-app.jsx'
import { loadOrders } from '../store/order/order.actions.js'

import { loadStays, setFilter } from '../store/stay.action.js'


export class _HomePage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('home-page')
        this.props.loadStays()

    }

    onSetFilter = (ev) => {
        ev.preventDefault()
        const filterBy = { loc: ev.target.id, checkInDate: '', checkOutDate: '' }
        this.props.setFilter(filterBy)
        this.props.loadStays({ loc: ev.target.id })
    }


    render() {
        return (
            <main className="home-page page main-container">
                <div className=" hero-container full">
                    <img className="main-pic" src="https://images.pexels.com/photos/5669106/pexels-photo-5669106.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
                </div>
                <div className="top-rated flex">
                    <p>Top Rated</p>
                    <div className="card-container">
                        <div className="img-container">
                            <Link to="/stay/62444cdaa9e274eca407d356"><img src="https://res.cloudinary.com/dcys8pbcf/image/upload/v1648643221/e7inwzyqslyg8fokwsnx.webp" alt="" /></Link>
                            <p>East Sooke Tree Hous</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/62445a88b5343a057b8223d8"><img src="https://res.cloudinary.com/dcys8pbcf/image/upload/v1648646766/db9iswyleuhkedze6vwc.webp" alt="" /></Link>
                            <p>Minimalist Studio in Lisbon</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/62444c2fa9e274eca407d355"><img src="https://res.cloudinary.com/dcys8pbcf/image/upload/v1648643017/qumctls4nxkpdsfwnwun.webp" alt="" /></Link>
                            <p>Luxury Exec Suite</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/61f66377009fc58dcc44a4bd"><img src="https://res.cloudinary.com/dcys8pbcf/image/upload/v1643537234/ztru2qavdnneb8xbtbzb.webp" alt="" /></Link>
                            <p>Jeanettes for 6 persons.</p>
                        </div>
                    </div>
                </div>
                <p>Popular destinations</p>
                <div className="city-container ">
                    <div onClick={this.onSetFilter} className="img-container">
                        <Link to="/stay">
                            <div className="img-text">Explore London</div>
                            <img id="london" src="https://images.unsplash.com/photo-1545853332-147d5073187e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" />
                        </Link>
                    </div>
                    <div onClick={this.onSetFilter} className="img-container">
                        <Link to="/stay">
                            <div className="img-text">Explore New York</div>
                            <img id="new york" src="https://images.pexels.com/photos/3525688/pexels-photo-3525688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                        </Link>
                    </div>
                </div>
                <Link className="become-host-link" to="/host">
                    <div className="img-text">Become a host</div>
                    <img src="https://news.airbnb.com/wp-content/uploads/sites/4/2021/06/Muji_Host_starter_kit_Airbnb-a58.jpg?w=2048" alt="" />
                </Link>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        orders: state.orderModule.orders,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    changePage,
    loadStays,
    setFilter,
    loadOrders
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
