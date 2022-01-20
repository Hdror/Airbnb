import React from "react"
import { Link } from "react-router-dom"
import Test from "../assest/svg/am01.svg"

import { stayService } from '../services/stay.service.js'
import { StayMap } from '../cmps/stay-map.jsx'


export class StayDetails extends React.Component {
    state = {
        stay: null
    }

    componentDidMount() {
        const { stayId } = this.props.match.params
        // console.log(stayId)
        // if (!stayId) {
        //     this.setState({ stay:toyService.getEmptyToy() })
        //     console.log(this.state);
        // }else 
        stayService.getById(stayId)
            .then(stay => { this.setState({ stay }) })
    }


    render() {
        if (!this.state.stay) return "LOADING"
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type, amenities } = this.state.stay
        const numOfReviews = reviews.length
        const txt = facilites.beds > 1 ? 'beds' : 'bed'
        return (
            <section className="main-container stay-details">
                <div>{name}</div>
                <div>
                    <span>{avgRate}</span>
                    <button>{numOfReviews} reviews</button>
                    <h2>{loc.address}</h2>
                </div>
                <div className="image-container">
                    {imgUrls.map((imgUrl, idx) => {
                        return <div key={idx} className="img">
                            <img src={imgUrl} alt="Not Found" />
                        </div>
                    })}
                </div>
                <div className="stay-container">
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
                    <div className="order-container">
                        {/* <Reserve/> */}
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
                        {amenities.map((amenitie, idx) => {
                            return <li key={idx}>{amenitie}
                                {/* {img} */}
                            </li>
                        })}
                    </ul>
                    <div><img src={Test} alt="" /></div>
                </section>
                <div>
                    <StayMap loc={loc} />
                </div>
            </section>
        )
    }
}