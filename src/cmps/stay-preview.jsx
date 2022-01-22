import React from 'react'
import { Link } from 'react-router-dom'
import ImgSlider from './img-slider.jsx'


export class StayPreview extends React.Component {
    render() {
        const { _id, name, avgRate, price, address, reviews } = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={this.props.stay} />
                    </div>
                    <div className="stay-preview-info">
                        <span>{avgRate}</span>
                        {/* <a className="clean-link" href="#">({reviews.length}  ·  reviews)</a> */}

                        <h3>{address}</h3>
                        <h1>{name}</h1>
                        <p><span>{price}$ </span><span>/ night</span></p>
                    </div>
                </Link>
            </div>
        )
    }
}