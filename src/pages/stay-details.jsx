import React from "react"
import { Link } from "react-router-dom"

import { stayService } from '../services/stay.service.js'

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
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host } = this.state.stay
        const numOfReviews = reviews.length
        const img = imgUrls.map((imgUrl, idx) => {
            console.log(idx);
            return idx
        })
        return (
            <section>
                console.log(img)
                <div>{name}</div>
                <div>
                    <span>{avgRate}</span>
                    <button>{numOfReviews} reviews</button>
                    <h2>{loc.address}</h2>
                </div>
                <section>
                    {imgUrls.map((imgUrl, idx) => {
                        return <img key={idx} src={imgUrl} alt="Not Found" />
                    })}
                </section>
            </section>
        )
    }
}