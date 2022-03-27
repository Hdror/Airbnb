export const utilService = {
  makeId,
  getRandomIntInclusive,
  delay,
  formattedDates,
  getRandomAmenities,
  getAllAmenities,
  timeConverter,
  firstLetterToUpperCase,
  avgReviewRate,
  getAvgRatings,
  getCells
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function formattedDates(chosenDate) {
  if (!chosenDate) return 'Add dates'
  const date = new Date(chosenDate)
  return date.toLocaleDateString('en-GB')
}

function getCells() {
  const cells = []
  for (let i = 0; i < 100; i++) {
      cells.push(<div key={`cell-${i}`} className="cell"></div>)
  }
  return cells
}

function getRandomAmenities() {
  const amens = ['Wifi', 'HotTub', 'Free Parking', 'Dryer', 'Kitchen', 'Microwave', 'Refrigerator', 'Stove', 'TV', 'Oven', 'Hot Water', 'Heating', 'Elevator', 'Beachfront', 'Patio or balcony', 'Backyard', 'EV charge']

  let newAmens = []
  for (var i = 0; i < amens.length; i++) {
    const index = getRandomIntInclusive(0, amens.length - 1)
    let amenity = amens.splice(index, 1)
    newAmens.push(amenity[0])
  }
  return newAmens
}

function getAllAmenities() {
  return ['Wifi', 'Heating', 'HotTub', 'Dryer', 'Kitchen', 'Microwave', 'Refrigerator', 'Stove', 'TV', 'Oven', 'Hangers', 'Hair dryer', 'Free parking',]
}

function timeConverter(time) {
  var a = new Date(time)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()
  var sec = a.getSeconds()
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}

export function firstLetterToUpperCase(word) {
  return word[0].toUpperCase() + word.slice(1)
}

// calculate stay avgRate
function avgReviewRate(reviews) { // avg per review
  if (!reviews.length) return 0
  let sum = 0
  let stayAvgs = []
  reviews.map(review => {
    sum = Object.values(review.ratings).reduce((sum, acc) => {
      return sum + acc
    }, 0) // returns an array of keys
    stayAvgs.push(sum / 6)
  })
  return (stayAvgs.reduce((sum, acc) => {
    return sum + acc
  })) / stayAvgs.length
}

function getAvgRatingsByKey(reviews) {
  // Array(reviews) -- object(review) -- object(ratings)
  let newRtaings = {
    cleanliness: 0,
    location: 0,
    accessibility: 0,
    checkIn: 0,
    communication: 0,
    accuracy: 0,
  }

  reviews.forEach((review) => {
    // console.log(review);
    for (const key in review.ratings) {
      // console.log(review.ratings);
      // console.log(key);
      newRtaings[key] += review.ratings[key]
    }
  })
  // console.log(newRtaings)
  return newRtaings
}

function getAvgRatings(reviews) {
  let ratings = getAvgRatingsByKey(reviews)
  let numOfReviews = reviews.length
  return {
    accuracy: ratings.accuracy / numOfReviews,
    location: ratings.location / numOfReviews,
    cleanliness: ratings.cleanliness / numOfReviews,
    accessibility: ratings.accessibility / numOfReviews,
    checkIn: ratings.checkIn / numOfReviews,
    communication: ratings.communication / numOfReviews,
  }
}

// function avgRatingsCleanliness(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.cleanliness // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }

// function avgRatingsCommunication(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.communication // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }

// function avgRatingsCheckIn(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.checkIn // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }

// function avgRatingsAccuracyy(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.accuracy // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }

// function avgRatingsAccessibility(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.accessibility // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }

// function avgRatingsLocation(reviews) {
//   let total = 0
//   reviews.forEach(review => {
//     total += review.ratings.location // getting right number
//   })
//   let avg = total / reviews.length
//   return avg.toFixed(1)
// }
