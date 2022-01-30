import React from 'react'
import { Link } from 'react-router-dom'
import ImgSlider from './img-slider.jsx'
import Star from "../assest/svg/app-detials/star.svg"
import {utilService} from "../services/util.service.js"



export class StayPreview extends React.Component {
    render() {
        const { _id, name, avgRate, price, loc, reviews ,typeOfPlace} = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={this.props.stay} />
                    </div>
                    <div className="stay-preview-info">
                        <div className="flex align-center">
                            {/* <img src={Star} alt="not-found" className="star" /> <span>{avgRate}</span> */}
                            <img src={Star} alt="not-found" className="star" /> <span>{(utilService.getRandomIntInclusive(3,4)+Math.random()).toFixed(2)}</span>
                            {/* <span className="review-count" >( {!reviews.length ? 'No reviews' : reviews.length} ) </span> */}
                            <span className="review-count" >({utilService.getRandomIntInclusive(20,50)}) </span>
                        </div>
                        <h3>{typeOfPlace} · {loc.address}</h3>
                        <h3>{name}</h3>
                        <p><span>${price}</span><span> / night</span></p>
                    </div>
                </Link>
            </div>
        )
    }
}