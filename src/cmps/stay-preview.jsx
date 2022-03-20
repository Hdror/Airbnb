import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCurrentUser, update } from '../store/user.actions.js'
import { loadStays } from '../store/stay.action.js'
import { utilService } from "../services/util.service.js"

import ImgSlider from './img-slider.jsx'

import Star from "../assest/svg/app-detials/star.svg"
import Like from "../assest/svg/general/like.svg"
import UnLike from "../assest/svg/general/unlike.svg"



class _StayPreview extends React.Component {

    isLiked = () => {
        const { user, stay } = this.props
        if (!user) return false
        if (user.likedStays.includes(stay._id)) return true
    }

    onLike = () => {
        const { stay, user } = this.props
        let likedStays = user.likedStays
        if (!this.isLiked()) likedStays.push(stay._id)
        else likedStays = likedStays.filter(likedStay => likedStay !== stay._id)
        this.props.update({ ...this.props.user, likedStays })
    }

    render() {
        const isLiked = this.isLiked()
        const { stay } = this.props
        const { _id, name, avgRate, price, loc, reviews, typeOfPlace } = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={stay} />
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
                <img onClick={this.onLike} className="like" src={(isLiked) ? Like : UnLike} alt="not-found" />
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        user: state.userModule.user,

    }
}

const mapDispatchToProps = {
    loadStays,
    getCurrentUser,
    update
}

export const StayPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StayPreview)