import React from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'




import { stayService } from '../services/stay.service.js'
import { StayMap } from '../cmps/stay-map.jsx'
import { StayReserve } from "../cmps/stay-reserve.jsx"
import { changePage } from '../store/page.action.js'




class _BackOffice extends React.Component {
    state = {
        stay: null
    }

    componentDidMount() {
        // this.props.changePage('stay-details')
        // const { stayId } = this.props.match.params
        // stayService.getById(stayId)
        //     .then(stay => { this.setState({ stay }) })
    }


    render() {
        if (!this.state.stay) return "LOADING"
        const { stay } = this.state
        // console.log(stay);
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type, amenities } = stay
        const numOfReviews = reviews.length
        const txt = facilites.beds > 1 ? 'beds' : 'bed'
        return (
            <main className="main-container stay-details page">
                <div className="stay-summary">
                    {/* <div></div> */}
                    <h2>{name}</h2>
                    <span className="stay-summary-address flex">
                        <span><input type="text" placeholder="Enter stay name here" /></span><span className="summary-share-save"></span></span>
                </div>
                {/* <div>{name}</div> */}
                {/* <div className="image-container">
                    {imgUrls.map((imgUrl, idx) => {
                        return <div key={idx} className="img">
                            <img src={imgUrl} alt="Not Found" />
                        </div>
                    })}
                </div> */}
                <div className="stay-info-container">
                    <div className="info flex">
                        <div className="stay-container flex">
                            <div className="property-details">
                                <section className="stay-info flex">
                                    <h1>Entire {type} hosted by {host.fullname}</h1>
                                    <ul className="clean-list">
                                        <li><input type="number" placeholder="Enter guest capacity" /></li><span>·</span>
                                        <li><input type="text" placeholder="Enter type of stay" /></li><span>·</span>
                                        <li><input type="text" placeholder="Enter number of bedrooms" /></li><span>·</span>
                                        <li><input type="text" placeholder="Enter number of beds" /></li>
                                    </ul>
                                </section>
                                {/* <div className="host-portrait">
                                    <img src={host.imgUrl} alt="photo needed" />
                                </div> */}
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
                </div>
            </main>
        )
    }
}


const mapDispatchToProps = {
    changePage
}

export const StayDetails = connect(
    null,
    mapDispatchToProps
)(_BackOffice)
