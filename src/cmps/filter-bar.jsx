import React from 'react'
import { connect } from 'react-redux'

import { utilService } from '../services/util.service.js'
import { loadStays } from '../store/stay.action.js'

import filter from '../assest/svg/general/filter.svg'
import arrow_down from '../assest/svg/general/arrow-down.svg'

import { TypeOfPlaceModal } from './type-of-place-modal.jsx'
import { PriceModal } from './price-modal.jsx'


export class _FilterBar extends React.Component {

    state = {
        stays: this.props.stays,
        amenities: utilService.getRandomAmenities(),
        isPriceModalOpen: false,
        isTypeOfPlaceModal: false
    }

        
    

    componentDidMount() {
        this.props.loadStays()
    }

    toggleTypeOfPlaceModal = () => {
        if (this.state.isPriceModalOpen) {
            return this.setState({ isPriceModalOpen: false })
        }
        this.setState({ isTypeOfPlaceModal: !this.state.isTypeOfPlaceModal })
    }

    togglePriceModal = () => {
        if (this.state.isTypeOfPlaceModal) {
            return this.setState({ isTypeOfPlaceModal: false })
        }
        this.setState({ isPriceModalOpen: !this.state.isPriceModalOpen })
    }



    render() {
        const { amenities, isPriceModalOpen, isTypeOfPlaceModal, stays } = this.state
        return <section className="filter-bar flex">
            <div onClick={this.togglePriceModal}>Price <img src={arrow_down} alt="" /></div>
            <div onClick={this.toggleTypeOfPlaceModal}>Type of place <img src={arrow_down} alt="" /></div>
            {amenities.map((amenity, idx) => {
                return <div key={idx}>{amenity}</div>
            })}
             {isTypeOfPlaceModal && <TypeOfPlaceModal />}
            {isPriceModalOpen && <PriceModal stays={stays} />}
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