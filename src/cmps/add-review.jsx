import React from 'react'
import { userService } from '../services/user.service.js'
import { RateStar } from './rate-star.jsx'
import { Link } from 'react-router-dom'

export class AddReview extends React.Component {
    state = {
        review: {
            txt: '',
            ratings: {
                cleanliness: 0,
                communication: 0,
                checkIn: 0,
                accuracy: 0,
                location: 0,
                accessibility: 0,
            },
            date: null,
            by: null,
        },
    }

    async componentDidMount() {
        const user = await userService.getLoggedinUser();
        if (user) {
            this.setState((prevState) => ({
                ...prevState,
                review: {
                    by: {
                        _id: user._id,
                        fullname: user.fullname,
                        imgUrl: user.imgUrl,
                    },
                },
            }))
        }
    }

    changeRate = (value, field) => {
        this.setState((prevState) => ({
            ...prevState,
            review: {
                ...prevState.review,
                ratings: { ...prevState.review.ratings, [field]: value },
            },
        }))
    }

    onHandleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ review: { ...this.state.review, [field]: value } })
    }

    clearState = async () => {
        const user = await userService.getLoggedinUser()
        this.setState((prevState) => ({
            review: {
                txt: '',
                ratings: {
                    cleanliness: 0,
                    communication: 0,
                    checkIn: 0,
                    accuracy: 0,
                    location: 0,
                    accessibility: 0,
                },
                date: null,
                by: {
                    ...prevState.by,
                    _id: user._id,
                    fullname: user.fullname,
                    imgUrl: user.imgUrl,
                },
            },
        }))
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        this.setState({
            review: {
                ...this.state.review, txt: this.state.review.txt,
                ratings: this.state.review.ratings,
                date: Date.now(),
            }
        },
            async () => {
                const user = await userService.getLoggedinUser()
                if (!user) return
                await this.props.onAddReview(this.state.review)
                this.clearState()
            }
        )
    }


    render() {
        const { txt, by } = this.state.review
        if (!by) return (
            <div className="review-login-request">
                <h4>Login to add review</h4>
                <Link to="/login"><button className="review-login-btn">Login / Signup</button></Link>
            </div>
        )
        return (
            <div className="add-review">
                <h2>Add Review</h2>
                <div className="add-review-by flex">
                    <div className="review-by-img"><img src={by.imgUrl} /></div>
                    <div>
                        <h4>{by.fullname}</h4>
                        <h4>{new Date(Date.now()).toLocaleDateString('en-GB')}</h4>
                    </div>
                </div>

                <RateStar isChangeable={true} ratingChanged={this.changeRate} />

                <form
                    className="add-review-form flex"
                    onSubmit={this.onSubmit}
                >
                    <textarea
                        className="add-review-txtarea"
                        name="txt"
                        type="text"
                        placeholder="Share your experience..."
                        value={txt}
                        onChange={this.onHandleChange}
                        required
                    />
                    <button>Add review</button>
                </form>
            </div>
        )
    }
}
