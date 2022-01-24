import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { changePage } from '../store/page.action.js'
import { StayApp } from './stay-app.jsx'


export class _HomePage extends React.Component {

    componentDidMount() {
        this.props.changePage('home-page')
    }

    componentDidUpdate() {

    }

    render() {
        return <main className="main-container page">
            <Link to={`/stay`}> Stay Page </Link>
        </main>

    }
}

const mapDispatchToProps = {
    changePage
}

export const HomePage = connect(
    null,
    mapDispatchToProps
)(_HomePage)
