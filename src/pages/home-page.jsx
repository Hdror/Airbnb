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
        return <main className="main-container">
            <Link to={`/stay`}> Stay Page </Link>
        </main>
        
    }
}

