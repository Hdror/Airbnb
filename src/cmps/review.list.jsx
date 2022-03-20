import React from 'react'
import { ReviewPreview } from './review-preview.jsx'


import Star from '../assest/svg/app-detials/star.svg'

export function ReviewList({ stay }) {

    return (
        <section className='review-list'>
            <div className="review-list-header">
                <img src={Star} alt="" />
                <h3>{stay.avgRate} · {stay.reviews.length} reviews</h3>
            </div>
            <div className="reviews-container">
                {stay.reviews.map((review, idx) => {
                    return <div className="review-card" key={idx}><ReviewPreview review={review} /></div>
                })}
            </div>
        </section>
    )
}
