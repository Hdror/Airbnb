import React from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { stayService } from '../services/stay.service.js';





export class PriceModal extends React.Component {

    state = {
        stays: this.props,
        priceAvg: stayService.getPriceAvg(this.props.stays)
    }



    render() {
        const {stays,priceAvg} = this.state
        return <section className="price-modal-container flex">
            <p className="price-avg">The average nightly price is ${priceAvg}</p>
            <form className="flex" action="">

                <Range />
            </form>
            <div className="save-clear flex">
                <div className="clear" >
                    <p >Clear</p>
                </div>
                <div className="save">Save</div>
            </div>
        </section>
    }
}