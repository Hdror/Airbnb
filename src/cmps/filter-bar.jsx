import React from 'react'

import { utilService } from '../services/util.service.js'

import filter  from '../assest/svg/general/filter.svg'


export class FilterBar extends React.Component {

    state = {
        amenities: utilService.getRandomAmenities()
    }


    componentDidMount() {
        // this.setState({ amenities: utilService.getRandomAmenities() })
    }


    render() {
        const { amenities } = this.state
        return <section className="filter-bar flex">
            <div>Price</div>
            <div>Type of place</div>
            {amenities.map((amenity, idx) => {
                return <div key={idx}>{amenity}</div>
            })}
            <div>
                 <img className="filter-svg flex" src={filter} alt="" />
                <p>Filter</p>
            </div>

        </section>

    }

}