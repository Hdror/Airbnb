import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { StayApp } from './stay-app.jsx'


export class HomePage extends React.Component {

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return <section>
            <h1>Home Page</h1>
            <Link to={`/stay`}> Stay Page </Link>
        </section>
    }
}

