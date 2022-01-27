import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { changePage } from '../store/page.action.js'
import { StayApp } from './stay-app.jsx'


export class _HomePage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('home-page')
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <main className="home-page page main-container">
                    <div className=" hero-container full">
                        <img className="main-pic" src="https://images.pexels.com/photos/5669106/pexels-photo-5669106.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
                    </div>
                <div className=" top-rated flex">
                    <p>Top Rated</p>
                    <div className="card-container">
                        <div>
                            <Link to="/stay/10006546"><img src="https://a0.muscache.com/im/pictures/268b4a9d-42b5-46e1-89b3-163e4be1883d.jpg?im_w=1440" alt="" /></Link>
                            <p>New cozy cottage</p>
                        </div>
                        <div>
                            <Link to="/stay/1142726"><img src="https://a0.muscache.com/im/pictures/ef5a3d3a-8fce-4eab-a0e5-41a7028e7f83.jpg?im_w=1200" alt="" /></Link>
                            <p>Cabin waterfront retreat</p>
                        </div>
                        <div>
                            <Link to="/stay/10006666"><img src="https://a0.muscache.com/im/pictures/c8f6b3eb-5fc7-4adb-bf9b-1138f64f0d66.jpg?im_w=1440" alt="" /></Link>
                            <p>Sleeping in a unique ship</p>
                        </div>
                        <div>
                            <Link to="/stay/1222666"><img src="https://a0.muscache.com/im/pictures/miso/Hosting-49381739/original/ddca4b48-7044-4e29-8978-540dc9415df0.jpeg?im_w=1200" alt="" /></Link>
                            <p>Come catch a Broadway Show</p>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </main>
        )

    }
}

const mapDispatchToProps = {
    changePage
}

export const HomePage = connect(
    null,
    mapDispatchToProps
)(_HomePage)
