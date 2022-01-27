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
            <main className="page">
                <div className="main-container">
                    <div className="upper-fold">
                        <div className="main-pic-container">
                            <img className="main-pic" src="https://images.wallpaperscraft.com/image/single/house_night_forest_136132_3840x2160.jpg" alt="" />
                        </div>
                    </div>
                </div>
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
