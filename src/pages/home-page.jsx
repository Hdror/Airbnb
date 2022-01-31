import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { changePage } from '../store/page.action.js'
import { StayApp } from './stay-app.jsx'

import { loadStays, setFilter } from '../store/stay.action.js'


export class _HomePage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('home-page')
    }

    componentDidUpdate() {

    }

    onSetFilter = (ev) => {
        console.log(ev.target.name);
        ev.preventDefault()
        const filterBy = { loc: ev.target.id, checkInDate: '', checkOutDate: '' }
        this.props.setFilter(filterBy)
        loadStays({ loc: ev.target.id })
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
                            <Link to="/stay/61f1667dbb734c19efd4088a"><img src="https://a0.muscache.com/im/pictures/268b4a9d-42b5-46e1-89b3-163e4be1883d.jpg?im_w=1440" alt="" /></Link>
                            <p>New cozy cottage</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/61f1667dbb734c19efd40890"><img src="https://a0.muscache.com/im/pictures/751a92f0-bdc9-48a0-84ed-b4bc735164d9.jpg?im_w=720" alt="" /></Link>
                            <p>Cabin waterfront retreat</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/61f1667dbb734c19efd4088c"><img src="https://a0.muscache.com/im/pictures/71f014d7-d1e6-46ab-abf7-e373147e97e2.jpg?im_w=1440" alt="" /></Link>
                            <p>Sleeping in a unique ship</p>
                        </div>
                        <div className="img-container">
                            <Link to="/stay/61f1667dbb734c19efd4088e"><img src="https://a0.muscache.com/im/pictures/miso/Hosting-49381739/original/ddca4b48-7044-4e29-8978-540dc9415df0.jpeg?im_w=1200" alt="" /></Link>
                            <p>Come catch a Broadway Show</p>
                        </div>
                    </div>
                </div>
                <p>Popular destinations</p>
                <div className="city-container flex">
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
                    <img src="https://images.pexels.com/photos/1496610/pexels-photo-1496610.jpeg?cs=srgb&dl=pexels-lena-hsvl-1496610.jpg&fm=jpg" alt="" />
                </Link>
            </main>
        )

    }
}

function mapStateToProps({ stayModule }) {
    return {
        stays: stayModule.stays,
    }
}

const mapDispatchToProps = {
    changePage,
    loadStays,
    setFilter
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
