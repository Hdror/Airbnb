import React from "react"
import { connect } from "react-redux"
// import { Link } from "react-router-dom"

import { DateRange } from './date-range.jsx'

class _AppHeader extends React.Component {

    render() {
        return (
            <div>
                <h1>Header</h1>
                <DateRange setDates={this.setDates} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}
const mapDispatchToProps = {

}

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader);