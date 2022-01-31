import { reviewService } from '../services/review.service'

export function loadReviews() {
  return async dispatch => {
    try {
      const reviews = reviewService.query()
      dispatch({ type: 'SET_REVIEWS', reviews })
    } catch (err) {
      console.log('Review Actions: err in loadReviews', err)
    }
  }
}

export function addReview(stay, review) {
  return async dispatch => {
    try {
      const addedReview = await reviewService.add(stay, review)
      dispatch({ type: 'ADD_REVIEW', review: addedReview })
    } catch (err) {
      console.log('Review Actions: err in addReview', err)
    }
  }
}

export function removeReview(reviewId) {
  return async dispatch => {
    try {
      await reviewService.remove(reviewId)
      dispatch({ type: 'REMOVE_REVIEW', reviewId })
    } catch (err) {
      console.log('ReviewActions: err in removeReview', err)
    }
  }
}
