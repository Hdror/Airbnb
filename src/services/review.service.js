import { storageService } from './async.storage.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


export const reviewService = {
    add,
    query,
    remove,
}


function query(filterBy = null) {
    const reviews = storageService.query('review', { params: filterBy })
    console.log(reviews)
    return
}

function remove(reviewId) {
    return storageService.remove('review', reviewId)
}

async function add(stay, review) {
    await userService.getLoggedinUser()
    console.log(review);
    const { ratings } = review
    console.log(ratings);
    var rate =
        ratings.cleanliness +
        ratings.communication +
        ratings.checkIn +
        ratings.accuracy +
        ratings.location +
        ratings.value
    var average = rate / 6
    ratings.avg = average

    const newReview = {
        id: utilService.makeId(),
        txt: review.txt,
        date: review.date,
        ratings: review.ratings,
        by: review.by,
    }
    stay.reviews.push(newReview)
    return newReview
}

