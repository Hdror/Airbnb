import React from 'react'
import { connect } from 'react-redux'

import { utilService } from '../services/util.service.js'
import { loadStays } from '../store/stay.action.js'

import filter from '../assest/svg/general/filter.svg'


export class _FilterBar extends React.Component {

    state = {
        amenities: utilService.getRandomAmenities(),
        filterBy:{

        }
    }

    componentDidMount() {
        this.props.loadStays()
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

function mapStateToProps({ stayModule }) {
    return {
      stays: stayModule.stays
    }
  }
  
  const mapDispatchToProps = {
    loadStays
  }
  
  export const FilterBar = connect(mapStateToProps, mapDispatchToProps)(_FilterBar)