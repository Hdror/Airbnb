import React from 'react'
import { Link } from 'react-router-dom'
import ImgSlider from './img-slider.jsx'


export class StayPreview extends React.Component {
    render() {
        const { _id, name, avgRate, price, address, reviews } = this.props.stay
        return (
            <Link className="clean-link" to={`/stay/${_id}`}>
                <div className='stay-preview'>
                    <ImgSlider stay={this.props.stay} />
                    <div className="stay-preview-info">
                        <span>{avgRate}</span>
                        <button>{reviews.length}</button>
                        <h3>{address}</h3>
                        <h1>{name}</h1>
                        <p><span>{price}$</span><span>/ night</span></p>
                    </div>
                </div>
            </Link>
        )
    }
}