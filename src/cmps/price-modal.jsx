import React from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { stayService } from '../services/stay.service.js';

export class PriceModal extends React.Component {

    state = {
        stays: this.props,
        priceAvg: stayService.getPriceAvg(this.props.stays),
        price: {
            minPrice: 0,
            maxPrice: 1000
        }
    }

    onSliderChange = (values) => {
        const [minPrice, maxPrice] = values
        this.setState({ price: { minPrice, maxPrice } })
    }

    onHandleChange = (ev) => {
        const [minPrice, maxPrice] = ev
        this.setState({minPrice,maxPrice})
    }

    onSave = () => {
        const price = this.state.price
        this.props.handleChange(price, true)
    }

    render() {
        const { priceAvg } = this.state
        return <section className="price-modal-container flex">
            <p className="price-avg">The average nightly price is ${Math.ceil(priceAvg)}</p>
            <form className="flex" >

                <Range
                    defaultValue={[0, 100]}
                    min={this.state.price.minPrice}
                    max={this.state.price.maxPrice}
                    onChange={this.props.handleChange}
                />
            </form>
            <div className="save-clear flex">
                <div className="clear" >
                    <p>Clear</p>
                </div>
                <div onClick={this.props.filterStays} className="save">Save</div>
            </div>
        </section>
    }
}