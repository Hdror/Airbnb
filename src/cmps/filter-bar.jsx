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
        isTypeOfPlaceModal: false,
        filterBy: {
            typeOfPlace: {
               'Entire place': false,
                'Private room': false,
                'Hotel room': false,
                'Shared room': false
            },
            amenities: [],
            price: {
                min: 0,
                max: Infinity
            }
        }
    }

    filterStays = () => {
        const {filterBy } = this.state
        const {stays } = this.props
        let filteredStays = stays.filter(stay=>{
            if(filterBy.typeOfPlace[stay.typeOfPlace]) 
            return stay  
        },()=>{  this.props.setFiltersStays(filteredStays)})
        this.props.setFiltersStays(filteredStays)
    }

    handleChange = (ev) => {
        const { target } = ev
        console.log(target);
        // if (target) {

        let field = target.name
        let value = target.value
        // let value = target.type === 'number' ? +target.value : target.value
        if (target.type === 'checkbox') {
            value = target.checked
            console.log('value:', value, 'field:', field);
            this.setState({ filterBy: { ...this.state.filterBy, typeOfPlace: { ...this.state.filterBy.typeOfPlace, [field]: value } } })
            // this.props.setFiltersStays()
            //         switch (field) {
            //             case 'entirePlace':
            //                 this.setState({})
            //                 break;

            //             default:
            //                 break;
            //         }
            //         let { inStock } = this.state.filterBy
            //         if (inStock) value = false
            //         else value = true
            //     }

            //     this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => { this.props.setFilterBy(this.state.filterBy) })

            // } else if (ev) {
            //     const labels = ev.map(option => option.value.toLowerCase())
            //     this.setState(prevState => ({ filterBy: { ...prevState.filterBy, labels } }), () => { this.props.setFilterBy(this.state.filterBy) })
            // }
        }
    }

    // componentDidMount() {
    //     this.props.loadStays()
    // }

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
        const { amenities, isPriceModalOpen, isTypeOfPlaceModal, filterBy } = this.state
        const{stays} = this.props
        return <section className="filter-bar flex">
            <div onClick={this.togglePriceModal}>Price <img src={arrow_down} alt="" /></div>
            <div onClick={this.toggleTypeOfPlaceModal}>Type of place <img src={arrow_down} alt="" /></div>
            {amenities.map((amenity, idx) => {
                return <div key={idx}>{amenity}</div>
            })}
            {isTypeOfPlaceModal && <TypeOfPlaceModal filterBy={filterBy}  filterStays={this.filterStays} handleChange={this.handleChange} />}
            {isPriceModalOpen && <PriceModal handleChange={this.handleChange} stays={stays} />}
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