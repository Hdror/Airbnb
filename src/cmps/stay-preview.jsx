import React from 'react'
import { Link } from 'react-router-dom'

// STORE
import { connect } from 'react-redux'
import { removeFromLikedStays, addToLikedStays } from '../store/user.actions.js'
import { loadStays } from '../store/stay.action.js'


// COMPONENTS
import ImgSlider from './img-slider.jsx'

// SVGS
import Star from "../assest/svg/app-detials/star.svg"

// SERVICES
import { utilService } from "../services/util.service.js"

class _StayPreview extends React.Component {
    render() {
        const { stay } = this.props
        const { _id, name, avgRate, price, loc, reviews, typeOfPlace } = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={this.props.stay} />
                    </div>
                    <div className="stay-preview-info">
                        <div className="flex align-center">
                            <img src={Star} alt="not-found" className="star" /><span>{stay.avgRate}</span>
                            <span className="review-count" >({stay.reviews.length}) </span>
                        </div >
                        <h3>{typeOfPlace} · {loc.address}</h3>
                        <h3>{name}</h3>
                        <p><span>${price}</span><span> / night</span></p>
                    </div >
                </Link >
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        likedStays: state.userModule.stays,
    }
}

const mapDispatchToProps = {
    loadStays,
    removeFromLikedStays,
    addToLikedStays,
}

export const StayPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StayPreview)