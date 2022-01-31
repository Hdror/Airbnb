import React from 'react'
import { Link } from 'react-router-dom'




export class SearchSuggestionModal extends React.Component {


    onSetFilter = (ev) => {
        console.log(ev.target.id);
        const { setFilter, loadStays } = this.props
        this.props.handleSearchChanges({ target: { name: 'loc', value: ev.target.id } })
        ev.preventDefault()
        const filterBy = { loc: ev.target.id, checkInDate: '', checkOutDate: '' }
        this.props.setFilter(filterBy)
        this.props.loadStays({ loc: ev.target.id })
    }




    render() {
        return <section className="search-link-modal">
            <p>SEARCH SUGGESTIONS</p>
            <div onClick={this.onSetFilter}>
                <Link to="stay" className="clean-link" >
                    <div id="New York" className="search-link">New York</div>
                </Link>
            </div>
            <div onClick={this.onSetFilter}>
                <Link to="stay" className="clean-link">
                    <div id="London" className="search-link">London</div>
                </Link>
            </div>
            <div onClick={this.onSetFilter}>
                <Link to="stay" className="clean-link">
                    <div id="Berlin" className="search-link">Berlin</div>
                </Link>
            </div>
            <div onClick={this.onSetFilter}>
                <Link to="stay" className="clean-link">
                    <div id="Madrid" className="search-link">Madrid</div>
                </Link>
            </div>
        </section>
    }

}