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
import { userService } from '../services/user.service.js'

class _StayPreview extends React.Component {
    // state = {
    //     isLiked: false,
    // }

    // async componentDidMount() {
    //     const { stay } = this.props
    //     const user = await userService.getLoggedinUser()
    //     if (user) {
    //         user.likedStays.forEach(likedStay => {
    //             if (user.likedStay.includes(stay._id)) {
    //                 this.setState({ isLiked: true })
    //             }
    //         })
    //     }
    // }

    // removeLikedStay = async (ev) => {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     const { stay } = this.props
    //     await userService.getLoggedinUser()
    //     await this.props.removeStayFromUser(stay._id)
    // }

    // saveLikedStay = async (ev) => {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     const { stay } = this.props
    //     await userService.getLoggedinUser()
    //     await this.props.saveStayToUser(stay._id)
    // }

    // toggleSavedStay = (ev) => {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     const { isLiked } = this.state
    //     if (isLiked) {
    //         this.saveStay(ev)
    //     } else {
    //         this.removeStay(ev)
    //     }
    // }

    // getReviewsAverage = (reviews) => {
    //     if (!reviews || !reviews.length) return 0
    //     const average =
    //         reviews.reduce((sum, value) => {
    //             return sum + value.ratings.avg
    //         }, 0) / reviews.length
    //     return average.toFixed(2)
    // }

    render() {
        const { stay } = this.props
        // const { isLiked } = this.state
        const { _id, name, avgRate, price, loc, reviews, typeOfPlace } = this.props.stay
        return (
            <div className='stay-preview'>
                <Link className="stay-card clean-link" to={`/stay/${_id}`}>
                    <div className="slider">
                        <ImgSlider stay={this.props.stay} />
                    </div>
                    <div className="stay-preview-info">
                        <div className="flex align-center">
                            {/* <img src={Star} alt="not-found" className="star" /> <span>{avgRate}</span> */}
                            <img src={Star} alt="not-found" className="star" /><span>{(utilService.getRandomIntInclusive(4, 4.99) + Math.random()).toFixed(2)}</span>
                            {/* <span className="review-count" >( {!reviews.length ? 'No reviews' : reviews.length} ) </span> */}
                            <span className="review-count" >({utilService.getRandomIntInclusive(20, 50)}) </span>
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