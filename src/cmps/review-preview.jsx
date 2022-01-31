import React from 'react'

export function ReviewPreview({ review }) {
  return (
    <div className='review-preview'>
      <div className='review-header'>
        <img src={review.by.imgUrl} />
        <div>
          <h3>{review.by.fullname}</h3>
          <h4>
          {review.date}
          </h4>
        </div>
      </div>
      <div className='review-content'>
        <p>{review.txt}</p>
      </div>
    </div>
  );
}
