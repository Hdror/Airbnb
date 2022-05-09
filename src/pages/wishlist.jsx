import React from "react"
import { connect } from 'react-redux'

import { StayPreview } from "../cmps/stay-preview.jsx"
import { Loader } from "../cmps/loader.jsx"

export class _Wishlist extends React.Component {

    state = {
        likedStays: []
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const likedStays = this.getWishList()
        this.setState({ likedStays })
    }

    getWishList = () => {
        const likedStays = this.props.user.likedStays
        let wishList = likedStays.map(likedStay => {
            return this.props.stays.find(stay => stay._id === likedStay)
        })
        return wishList
    }


    render() {
        const { likedStays } = this.state
        if (!likedStays.length) return <main className="page main-container"> <Loader /> </main>
        return <main className="page main-container">
            <div className="wishlist">
                <h1>Your favorite stays</h1>
                <div className="wishlist-container">
                    {likedStays.map((stay) => (
                        <StayPreview key={stay._id} stay={stay} />
                    ))}
                </div>
            </div>
        </main>
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        user: state.userModule.user,

    }
}
const mapDispatchToProps = {

}


export const Wishlist = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Wishlist)