import React from "react"
import { Link } from "react-router-dom"

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
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type } = this.state.stay
        const numOfReviews = reviews.length
        const txt = facilites.beds > 1 ? 'beds' : 'bed'
        console.log(imgUrls);
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
                        return <div className="img">
                            <img key={idx} src={imgUrl} alt="Not Found" />
                        </div>
                    })}
                </div>
                <div className="stay-container">
                    <div className="property-details">
                        <section className="host-img-and-desc">
                            <h1>Entire {type} hosted by {host.fullname}</h1>
                            <div className="host-portrait">
                                <img src={host.imgUrl} alt="photo needed" />
                            </div>
                        </section>
                        <ul className="clean-list">
                            <li>{capacity} guests</li><span>·</span>
                            <li>{type}</li><span>·</span>
                            <li>{facilites.bedrooms} bedrooms</li><span>·</span>
                            <li>{facilites.beds} {txt}</li>
                        </ul>
                    </div>
                    <div className="order-container">
                        {/* <Reserve/> */}
                    </div>
                </div>
                <div>{summary}</div>
                <div>
                    <StayMap loc={loc} />
                </div>
            </section>
        )
    }
}