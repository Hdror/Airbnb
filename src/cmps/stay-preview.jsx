import React from 'react'
import { Link } from 'react-router-dom'

export class StayPreview extends React.Component {
    render() {
        const { name, imgUrls, avgRate, price, address, reviews } = this.props.stay
        return (
            <Link to={`/stay/stayId`}>
                {/* <React.Fragment> */}
                <div className='stay-preview'>
                    <img src={imgUrls[0]} alt="" />
                    <span>{avgRate}</span>
                    <button>{reviews.length}</button>
                    <h3>{address}</h3>
                    <h1>{name}</h1>
                    <h2>{price} / night</h2>
                </div>
                {/* </React.Fragment> */}
            </Link>
        )
    }
}