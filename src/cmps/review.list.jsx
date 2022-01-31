import React from 'react'
import { ReviewPreview } from './review-preview.jsx'

export function ReviewList({ reviews }) {
    return (
        <section className='review-list'>
            {reviews ? (reviews.map((review, idx) => {
                return <ReviewPreview key={idx} review={review} />
            })) : (<h1>No Reviews</h1>)}
        </section>
    )
}
