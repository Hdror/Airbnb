import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Loader } from './loader.jsx'

export class RateStar extends React.Component {
    state = {
        ratings: {
            avg: 0,
            cleanliness: 0,
            communication: 0,
            checkIn: 0,
            accuracy: 0,
            location: 0,
            acessibility: 0,
        },
        isShown: true,
    };

    avgRate = (reviews, field) => {
        // return (
        const avg = reviews.reduce((acc, value) => {
            return acc + value.ratings[field]
        }, 0) / reviews.length
        // )
    }

    componentDidMount() {
        const { reviews } = this.props
        if (reviews) {
            this.setState((prevState) => ({
                ...prevState,
                ratings: {
                    cleanliness: this.avgRate(reviews, 'cleanliness'),
                    communication: this.avgRate(reviews, 'communication'),
                    checkIn: this.avgRate(reviews, 'checkIn'),
                    accuracy: this.avgRate(reviews, 'accuracy'),
                    location: this.avgRate(reviews, 'location'),
                    accessibility: this.avgRate(reviews, 'accessibility')
                },
            }))
        }
        this.setState({ isShown: false })
    }

    render() {
        const { isChangeable, ratingChanged } = this.props
        const { cleanliness, communication, accuracy, location, value, checkIn } = this.state.ratings
        const { isShown } = this.state
        if (isShown) return <Loader />
        return (
            <div className='review-rating-container'>
                <div className='review-rating-item'>
                    <div>
                        <h3>Location</h3>
                    </div>

                    <ReactStars
                        name='location'
                        value={location}
                        size={24}
                        count={5}
                        onChange={(value) => ratingChanged(value, 'location')}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>

                <div className='review-rating-item'>
                    <h3>Accessibility</h3>
                    <ReactStars
                        name='accessibility'
                        size={24}
                        count={5}
                        onChange={(value) => ratingChanged(value, 'accessibility')}
                        value={value}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>

                <div className='review-rating-item'>
                    <h3>Accuracy</h3>
                    <ReactStars
                        name='accuracy'
                        size={24}
                        count={5}
                        onChange={(ev) => ratingChanged(ev, 'accuracy')}
                        value={accuracy}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>

                <div className='review-rating-item'>
                    <h3>Check-in</h3>
                    <ReactStars
                        name='checkIn'
                        size={24}
                        count={5}
                        onChange={(value) => ratingChanged(value, 'checkIn')}
                        value={checkIn}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>

                <div className='review-rating-item'>
                    <h3>Communication</h3>
                    <ReactStars
                        name='communication'
                        size={24}
                        count={5}
                        onChange={(value) => ratingChanged(value, 'communication')}
                        value={communication}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>
                <div className='review-rating-item'>
                    <h3>Cleanliness</h3>
                    <ReactStars
                        name='cleanliness'
                        size={24}
                        count={5}
                        onChange={(value) => ratingChanged(value, 'cleanliness')}
                        value={cleanliness}
                        edit={isChangeable}
                        activeColor='#FF385C'
                    />
                </div>
            </div>
        );
    }
}
