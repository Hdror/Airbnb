import React from 'react'
import { Link } from 'react-router-dom'
import ImgSlider from './img-slider.jsx'
import Star from "../assest/svg/app-detials/star.svg"


export class StayPreview extends React.Component {
    render() {
        const { _id, name, avgRate, price, loc, reviews } = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={this.props.stay} />
                    </div>
                    <div className="stay-preview-info">
                    <img src={Star} alt="not-found" className="star"/> <span>{avgRate}</span>
                        {/* <a className="clean-link" href="#">({reviews.length}  ·  reviews)</a> */}
                        <span className="review-count" >({reviews.length} reviews) </span>
                        <h3>Entire rental unit · {loc.city}</h3>
                        <h3>{name}</h3>
                        <p><span>{price}$</span><span>/night</span></p>
                    </div>
                </Link>
            </div>
        )
    }
}