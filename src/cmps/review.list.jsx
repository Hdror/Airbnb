import React from 'react'

// Services
import { utilService } from '../services/util.service.js'

// Components
import { ReviewPreview } from './review-preview.jsx'

// SVG
import Star from '../assest/svg/app-detials/star.svg'


export function ReviewList({ stay }) {

    let avg = utilService.getAvgRatings(stay.reviews)

    return (
        < section className='review-list' >
            <div className="review-list-header">
                <img src={Star} alt="" />
                <h3>{stay.avgRate} · {stay.reviews.length} reviews</h3>
            </div>
            <div className="review-ratings-avg-container">
                <div className="review-ratings-avg-holder">
                    <div className="review-ratings-avg">
                        <div>Cleanliness</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.cleanliness / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.cleanliness.toFixed(1)}</span>}
                        </div>
                    </div>

                    <div className="review-ratings-avg">
                        <div>Communication</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.communication / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.communication.toFixed(1)}</span>}
                        </div>
                    </div>
                    <div className="review-ratings-avg">
                        <div>Check-In</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.checkIn / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.checkIn.toFixed(1)}</span>}
                        </div>
                    </div>


                    <div className="review-ratings-avg">
                        <div>Location</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.location / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.location.toFixed(1)}</span>}
                        </div>

                    </div>

                    <div className="review-ratings-avg">
                        <div>Accessibility</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.accessibility / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.accessibility.toFixed(1)}</span>}
                        </div>
                    </div>

                    <div className="review-ratings-avg">
                        <div>Accuracy</div>
                        <div className="graph-review">
                            <div className="review-avg-full-width">
                                <div style={{ width: `${avg.accuracy / 5 * 100}%` }} className="review-avg-width"></div>
                            </div>
                            {<span>{avg.accuracy.toFixed(1)}</span>}
                        </div>
                    </div>

                </div>


            </div>
            <div className="reviews-container">
                {stay.reviews.map((review, idx) => {
                    return <div className="review-card" key={idx}><ReviewPreview review={review} /></div>
                })}
            </div>
        </section >
    )
}
