import React from 'react'

// STORE
import { connect } from 'react-redux'
import { changePage, toggleModal } from '../store/page.action.js'
import { loadReviews, addReview } from '../store/review.actions.js'
import { onUpdateStay } from '../store/stay.action.js'
import { getCurrentUser, update } from '../store/user.actions.js'

//SVG
import Enhanced_clean from '../assest/svg/perks/Enhanced_clean.svg'
import Entire_home from '../assest/svg/perks/Entire_home.svg'
import Great_location from '../assest/svg/perks/Great_location.svg'
import Self_check_in from '../assest/svg/perks/Self_check_in.svg'
import Star from '../assest/svg/app-detials/star.svg'
import Save from '../assest/svg/app-detials/save.svg'
import Saved from '../assest/svg/app-detials/saved.svg'
import Share from '../assest/svg/app-detials/Share.svg'

// COMPONENTS
import { stayService } from '../services/stay.service.js'
import { utilService } from '../services/util.service.js'
import { StayMap } from '../cmps/stay-map.jsx'
import { StayReserve } from '../cmps/stay-reserve.jsx'
import { ReviewList } from '../cmps/review.list.jsx'
import { AddReview } from '../cmps/add-review.jsx'

class _StayDetails extends React.Component {
    state = {
        stay: null
    }

    onShare = () => {

    }

    isLiked = () => {
        const { user } = this.props
        const { stay } = this.state
        if (!user) return false
        if (user.likedStays.includes(stay._id)) return true
    }

    onLike = () => {
        const { user } = this.props
        const { stay } = this.state
        let likedStays = user.likedStays
        if (!this.isLiked()) likedStays.push(stay._id)
        else likedStays = likedStays.filter(likedStay => likedStay !== stay._id)
        this.props.update({ ...this.props.user, likedStays })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('stay-details')
        const { stayId } = this.props.match.params
        stayService.getById(stayId)
            .then(stay => { this.setState({ stay }) })
    }

    onAddReview = async (review) => {
        try {
            const { stay } = this.state
            await this.props.addReview(stay, review)
            const stayAvg = utilService.avgReviewRate(stay.reviews).toFixed(2)
            this.setState({ stay: { ...this.state.stay, avgRate: stayAvg} })
            await this.props.onUpdateStay(this.state.stay)
        } catch (err) {
            console.log('login first')
        }
    }

    render() {
        if (!this.state.stay) return 'LOADING'
        const isLiked = this.isLiked()
        const { stay } = this.state
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type, amenities } = stay
        const numOfReviews = reviews.length
        const txt = facilites.beds > 1 ? 'beds' : 'bed'
        return (
            <main className="main-container stay-details page">
                <div className="stay-summary">
                    <h2>{name}</h2>
                    <div className="stay-summary-address flex">
                        <div className="summary-details flex">
                            <img src={Star} alt="" />{avgRate} · <a href="#">{numOfReviews} Reviews</a> · <span>{loc.address}</span>
                        </div>
                        <div className="summary-share-save flex">
                            <div onClick={this.onShare} className="summary-share"><img src={Share} alt="" />Share</div>
                            <div onClick={this.onLike} className="summary-save"><img src={(isLiked) ? Saved : Save} alt="" />{(isLiked) ? "Saved" : "Save"}</div>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    {imgUrls.map((imgUrl, idx) => {
                        return <div key={idx} className="img">
                            <img src={imgUrl} alt="Not Found" />
                        </div>
                    })}
                </div>
                <div className="stay-info-container">
                    <div className="info flex">
                        <div className="stay-container flex">
                            <div className="property-details">
                                <section className="stay-info flex">
                                    <h1>Entire {type} hosted by {host.fullname}</h1>
                                    <ul className="clean-list">
                                        <li>{capacity} guests</li><span>·</span>
                                        <li>{type}</li><span>·</span>
                                        <li>{facilites.bedrooms} bedrooms</li><span>·</span>
                                        <li>{facilites.beds} {txt}</li>
                                    </ul>
                                </section>
                                <div className="host-portrait">
                                    <img src={host.imgUrl} alt="photo needed" />
                                </div>
                            </div>
                        </div>
                        <div className="stay-perks">
                            <ul className="clean-list">
                                <li><span><img src={Entire_home} alt="" />Entire home</span> <span>You’ll have the apartment to yourself.</span> </li>
                                <li><span><img src={Enhanced_clean} alt="" /> Enhanced Clean</span><span> This Host committed to Airbnb's 5-step enhanced cleaning process.</span></li>
                                <li><span><img src={Self_check_in} alt="" /> Self check-in</span> <span>Check yourself in with the lockbox.</span></li>
                                <li><span><img src={Great_location} alt="" /> Great location</span> <span> 100% of recent guests gave the location a 5-star rating.</span></li>
                            </ul>
                        </div>
                        <div className="summary">{summary}</div>
                        <section className="amenities-container">
                            <h1>What this place offers</h1>
                            <ul className="amenities clean-list">
                                {amenities.map((amenity, idx) => {
                                    return <li className="flex" key={idx}>  <img src={stayService.amenitiesSvg[amenity]} alt="" />  {amenity}
                                    </li>
                                })}
                            </ul>
                        </section>
                    </div>
                    <div className="order">
                        <div className="reserve"><StayReserve stay={stay} /></div>
                    </div>
                </div>
                <div>
                    {!!reviews.length && <ReviewList stay={stay} />}
                    <AddReview onAddReview={(review) => this.onAddReview(review)} />
                </div>
                <div>
                    <StayMap loc={loc} />
                </div>
            </main>
        )
    }
}


const mapDispatchToProps = {
    changePage,
    toggleModal,
    loadReviews,
    addReview,
    onUpdateStay,
    getCurrentUser,
    update
}

function mapStateToProps(state) {
    return {
        modalState: state.pageModule.modalState,
        isModalOpen: state.pageModule.isModalOpen,
        user: state.userModule.user,
    }
}

export const StayDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StayDetails)
