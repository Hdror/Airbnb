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
            <section className='main-container'>
                <div>{name}</div>
                <div>
                    <span>{avgRate}</span>
                    <button>{numOfReviews} reviews</button>
                    <h2>{loc.address}</h2>
                </div>
                <div>
                    {imgUrls.map((imgUrl, idx) => {
                        return <img key={idx} src={imgUrl} alt="Not Found" />
                    })}
                </div>
                <div>
                    <h1>Entire {type} hosted by {host.fullname}</h1>
                    <img src={host.imgUrl} alt="photo needed" />
                    <ul>
                        <li>{capacity} guests</li><span>.</span>
                        <li>{type}</li><span>.</span>
                        <li>{facilites.bedrooms} bedrooms</li><span>.</span>
                        <li>{facilites.beds} {txt}</li>
                    </ul>
                </div>
                <div>{summary}</div>
                <div>
                    <StayMap loc={loc}/> 
                </div>
            </section>
        )
    }
}