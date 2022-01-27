import React from 'react'
import { connect } from 'react-redux'

import { utilService } from '../services/util.service.js'
import { setFrontFilter } from '../store/stay.action.js'

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
                minPrice: 0,
                maxPrice: Infinity
            }
        }
    }

    filterStays = () => {
        const { filterBy } = this.state
        console.log(filterBy);
        const { stays } = this.props
        let filteredStays = stays.filter(stay => {
            console.log(stay.price, filterBy.price);
            if (filterBy.typeOfPlace[stay.typeOfPlace] && filterBy.amenities.every((amemity) => {
                return stay.amenities.includes(amemity)
            }) && (filterBy.price.minPrice < stay.price && filterBy.price.maxPrice > stay.price))
                return stay
        })
        console.log(filteredStays);
        this.props.setFiltersStays(filteredStays)
        this.setState({ isPriceModalOpen: false, isTypeOfPlaceModal: false })
    }

    cleanForm = () => {
        this.setState({ filterBy: { ...this.state.filterBy, typeOfPlace: { 'Entire place': false, 'Private room': false, 'Hotel room': false, 'Shared room': false } } })
    }

    handleChange = (ev) => {
        if (ev.target) {
            const { target } = ev
            let field = target.name
            let value = target.value
            if (target.type === 'checkbox') {
                value = target.checked
                this.setState({ filterBy: { ...this.state.filterBy, typeOfPlace: { ...this.state.filterBy.typeOfPlace, [field]: value } } })

            } else if (target.id === 'amenities') {
                value = target.className
                const { amenities } = this.state.filterBy
                if (this.state.filterBy.amenities.includes(value)) {
                    this.setState({
                        filterBy: { ...this.state.filterBy, amenities: amenities.filter((val) => { return val !== value }) }
                    }, () => { this.filterStays() })
                } else {
                    this.setState({ filterBy: { ...this.state.filterBy, amenities: [...amenities, value] } }, () => { this.filterStays() })
                }
            }
        } else {
            const [minPrice, maxPrice] = ev
            this.setState({ filterBy: { ...this.state.filterBy, price: { minPrice, maxPrice } } })
        }

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
        const { amenities, isPriceModalOpen, isTypeOfPlaceModal, filterBy } = this.state
        const { stays } = this.props
        return <section className="filter-bar flex">
            <div onClick={this.togglePriceModal}>Price <img src={arrow_down} /></div>
            <div onClick={this.toggleTypeOfPlaceModal}>Type of place <img src={arrow_down} /></div>
            {amenities.map((amenity, idx) => {
                return <div onClick={this.handleChange} id="amenities"  className={amenity} key={idx}>{amenity}</div>
            })}
            {isTypeOfPlaceModal && <TypeOfPlaceModal filterBy={filterBy} cleanForm={this.cleanForm} filterStays={this.filterStays} handleChange={this.handleChange} />}
            {isPriceModalOpen && <PriceModal handleChange={this.handleChange} filterStays={this.filterStays} stays={stays} />}
            <div>
                <img className="filter-svg flex" src={filter} />
                <p>Filter</p>
            </div>
        </section>
    }
}

function mapStateToProps({ stayModule }) {
    return {
        stays: stayModule.stays,
        filterBy: stayModule.frontFilterBy
    }
}

const mapDispatchToProps = {
    setFrontFilter
}

export const FilterBar = connect(mapStateToProps, mapDispatchToProps)(_FilterBar)