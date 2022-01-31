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
            maxPrice: Infinity
        }
    }

    onSliderChange = (values) => {
        const [minPrice, maxPrice] = values
        this.setState({ price: {minPrice, maxPrice} }, () => { console.log(this.state.price)})
    }

    onSave = () => {
        this.props.handleChange(this.state.price, true)
    }

    render() {
        const { priceAvg } = this.state
        return <section className="price-modal-container flex">
            <p className="price-avg">The average nightly price is ${priceAvg}</p>
            <form className="flex" >

                <Range
                    defaultValue={[0, 100]}
                    min={0}
                    max={1000}
                    onChange={ this.props.handleChange}
                />
            </form>
            <div className="save-clear flex">
                <div className="clear" >
                    <p >Clear</p>
                </div>
                <div onClick={this.props.filterStays} className="save">Save</div>
            </div>
        </section>
    }
}