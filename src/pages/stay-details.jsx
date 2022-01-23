import React from "react"
import { Link } from "react-router-dom"

import Wifi from "../assest/svg/amenities/Wifi.svg"
import Heating from "../assest/svg/amenities/Heating.svg"
import HotTub from "../assest/svg/amenities/HotTub.svg"
import Free_Parking from "../assest/svg/amenities/Free_Parking.svg"
import Dryer from "../assest/svg/amenities/Dryer.svg"
import Kitchen from "../assest/svg/amenities/Kitchen.svg"
import Microwave from "../assest/svg/amenities/Microwave.svg"
import Refrigerator from "../assest/svg/amenities/Refrigerator.svg"
import Stove from "../assest/svg/amenities/Stove.svg"
import TV from "../assest/svg/amenities/TV.svg"
import Oven from "../assest/svg/amenities/Oven.svg"
import Hangers from "../assest/svg/amenities/Hangers.svg"

import Star from "../assest/svg/app-detials/star.svg"

import { stayService } from '../services/stay.service.js'
import { StayMap } from '../cmps/stay-map.jsx'
import { StayReserve } from "../cmps/stay-reserve.jsx"


export class StayDetails extends React.Component {
    state = {
        stay: null
    }

    componentDidMount() {
        const { stayId } = this.props.match.params
        stayService.getById(stayId)
            .then(stay => { this.setState({ stay }) })
    }


    render() {
        if (!this.state.stay) return "LOADING"
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type, amenities } = this.state.stay
        const numOfReviews = reviews.length
        const txt = facilites.beds > 1 ? 'beds' : 'bed'
        const amens = { Hangers, Wifi, Heating, HotTub, Free_Parking, Dryer, Kitchen, Microwave, Refrigerator, Stove, TV, Oven }
        return (
            <main className="main-container stay-details page">
                <div className="stay-summary">
                    {/* <div></div> */}
                    <h2>{name}</h2>
                    <span><img src={Star} alt="" />{avgRate} · <a href="#">{numOfReviews} Reviews</a> · <span>{loc.address}</span></span>
                </div>
                {/* <div>{name}</div> */}
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
                                <li><span>Entire home</span> <span>You’ll have the apartment to yourself.</span> </li>
                                <li><span>Enhanced Clean</span><span> This Host committed to Airbnb's 5-step enhanced cleaning process.</span></li>
                                <li><span>Self check-in</span> <span>Check yourself in with the lockbox.</span></li>
                                <li><span>Great location</span> <span> 100% of recent guests gave the location a 5-star rating.</span></li>
                            </ul>
                        </div>
                        <div className="summary">{summary}</div>
                        <section className="amenities-container">
                            <h1>What this place offers</h1>
                            <ul className="amenities clean-list">
                                {amenities.map((amenity, idx) => {
                                    return <li key={idx}> <span><img src={amens[amenity]} alt="" /></span>  {amenity}
                                    </li>
                                })}
                            </ul>

                        </section>
                    </div>
                    <div className="order">
                        <div className="reserve"><StayReserve /></div>
                    </div>
                </div>
                <div>
                    <StayMap loc={loc} />
                </div>
            </main>
        )
    }
}