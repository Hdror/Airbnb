import React from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { loadStays, addStay, onUpdateStay, removeStay } from '../store/stay.action.js'
import { changePage } from '../store/page.action.js'
import { Upload } from "./upload.jsx"

import Enhanced_clean from '../assest/svg/perks/Enhanced_clean.svg'
import Entire_home from '../assest/svg/perks/Entire_home.svg'
import Great_location from '../assest/svg/perks/Great_location.svg'
import Self_check_in from '../assest/svg/perks/Self_check_in.svg'

import { stayService } from '../services/stay.service.js'
import { StayReserve } from "./stay-reserve.jsx"




class _StayEdit extends React.Component {
    state = {
        stay: {
            name: '',
            type: '',
            typeOfPlace: "Entire place",
            imgUrls: [],
            price: 0,
            summary: '',
            capacity: 2,
            facilites: {
                beds: 1,
                bedrooms: 1,
                bathrooms: 1
            },
            amenities: {
                Wifi: false,
                Heating: false,
                HotTub: false,
                Dryer: false,
                Kitchen: false,
                Microwave: false,
                Refrigerator: false,
                Stove: false,
                TV: false,
                Oven: false,
                Hangers: false,
                'Hair dryer': false,
                'Free parking': false,
            },
            host: {},
            loc: {
                country: '',
                city: '',
                countryCode: '',
                address: '',
                lat: 0,
                lng: 0
            },
            reviews: []
        }

    }


    componentDidMount() {
        if (this.props.stayId) {
            // getById to stay and add to stay state
        }

        // this.props.loadStays()
        // const { stays } = this.props
        // console.log(stays);

        // this.props.loadStays(this.props.filterBy).then(stays => {
        // })
        // this.props.changePage('stay-details')
        // const { stayId } = this.props.match.params
        // stayService.getById(stayId)
        //     .then(stay => { this.setState({ stay }) })
    }

    onUploadImg = (imgState, position) => {
        const { imgUrls } = this.state.stay
        imgUrls[position] = imgState.imgUrl
        this.setState({ stay: { ...this.state.stay, imgUrls } })
    }

    updateStay = () => {

    }


    onHandleChange = (ev) => {
        let { target } = ev
        console.log(target.value);
        if (target) {
            const field = target.name
            const value = target.type === 'number' ? +target.value : target.value
            this.setState((prevState) => ({ order: { ...prevState.order, [field]: value } }))
        }
        else if (ev) {
            const labels = ev.map(option => option.value.toLowerCase())
            this.setState(prevState => ({ order: { ...prevState.order, labels } }))
        }

    }

    onRemoveStay = () => {

    }


    render() {
        if (!this.props.stays) return "LOADING"
        const { stay } = this.state
        const { stays } = this.props
        // console.log(stay);
        const { name, avgRate, reviews, loc, imgUrls, facilites, capacity, host, summary, type, amenities } = stays
        // const txt = facilites.beds > 1 ? 'beds' : 'bed'
        return (
            <main className="page main-container">
                <div className="stay-edit-container">
                    {/* <div></div> */}
                    <h2>{name}</h2>
                    <span className="stay-edit-location">
                        <span><input type="text" name="name" placeholder="Enter stay name here" onChange={this.onHandleChange} value={stay.name} /></span>
                        <span><input type="text" name="address" placeholder="Enter stay address here" /></span>
                    </span>
                </div>
                {/* <div>{name}</div> */}
                {/* <div className="image-container">
                    {imgUrls.map((imgUrl, idx) => {
                        return <div key={idx} className="img">
                            <img src={imgUrl} alt="Not Found" />
                        </div>
                    })}
                </div> */}
                <div className="stay-edit-info-container">
                    <div className="stay-edit-info flex">
                        <div className="stay-edit-container flex">
                            <div className="stay-edit-property-details">
                                <section className="stay-edit-details flex">
                                    {/* <h1>Entire {type} hosted by {host.fullname}</h1> */}
                                    <ul className="clean-list">
                                        <li><input type="number" name="capacity" placeholder="Enter guest capacity" /></li>
                                        <select name="stayType" id="">
                                            <option value="Entire Place">Entire Place</option>
                                            <option value="Private Room">Private Room</option>
                                            <option value="Shared Room">Shared Room</option>
                                            <option value="Hotel Room">Hotel Room</option>
                                        </select>
                                        <select name="propertyType" id="">
                                            <option onChange={this.onHandleChange} value={stay.type}>Loft</option>
                                            <option onChange={this.onHandleChange} value="Apartment">Apartment</option>
                                            <option onChange={this.onHandleChange} value="Shared Room">Shared Room</option>
                                            <option onChange={this.onHandleChange} value="Hotel">Hotel</option>
                                            <option onChange={this.onHandleChange} value="House">House</option>
                                            <option onChange={this.onHandleChange} value="Guesthouse">Guesthouse</option>
                                        </select>
                                        <li><input type="text" name="bedrooms" placeholder="Enter number of bedrooms" /></li>
                                        <li><input type="text" name="beds" placeholder="Enter number of beds" /></li>
                                    </ul>
                                </section>
                                {/* <div className="host-portrait">
                                    <img src={host.imgUrl} alt="photo needed" />
                                </div> */}
                            </div>
                            <Upload
                                position={0}
                                onUploadImg={this.onUploadImg}
                                userImgUrl={this.state.stay.imgUrls[0]} />
                        </div>
                        <div className="stay-edit-perks">
                            <ul className="clean-list">
                                <li><span><img src={Entire_home} alt="" />Entire home</span> <span>You’ll have the apartment to yourself.</span> </li>
                                <li><span><img src={Enhanced_clean} alt="" /> Enhanced Clean</span><span> This Host committed to Airbnb's 5-step enhanced cleaning process.</span></li>
                                <li><span><img src={Self_check_in} alt="" /> Self check-in</span> <span>Check yourself in with the lockbox.</span></li>
                                <li><span><img src={Great_location} alt="" /> Great location</span> <span> 100% of recent guests gave the location a 5-star rating.</span></li>
                            </ul>
                        </div>
                        <div className="stay-edit-summary">{summary}
                            <textarea type="text" name="description" cols="30" rows="30"></textarea></div>
                        <section className="stay-edit-amenities-container">
                            <div className="stay-edit-amenities clean-list">
                                <div><input type="checkbox" value="Wifi" />Wifi</div>
                                <div><input type="checkbox" value="Heating" />Heating</div>
                                <div><input type="checkbox" value="HotTub" />HotTub</div>
                                <div><input type="checkbox" value="Dryer" />Dryer</div>
                                <div><input type="checkbox" value="Kitchen" />Kitchen</div>
                                <div><input type="checkbox" value="Microwave" />Microwave</div>
                                <div><input type="checkbox" value="Refrigerator" />Refrigerator</div>
                                <div><input type="checkbox" value="Stove" />Stove</div>
                                <div><input type="checkbox" value="TV" />TV</div>
                                <div><input type="checkbox" value="Oven" />Oven</div>
                                <div><input type="checkbox" value="Hangers" />Hangers</div>
                                <div><input type="checkbox" value="Hair dryer" />Hair dryer</div>
                                <div><input type="checkbox" value="Free parking" />Free Parking</div>
                            </div>
                        </section>
                    </div>
                </div>
                <button onClick={this.updateStay}>Save</button>
            </main>
        )
    }
}


function mapStateToProps({ stayModule }) {
    return {
        stays: stayModule.stays,
        filterBy: stayModule.filterBy
    }
}

const mapDispatchToProps = {
    changePage,
    onUpdateStay,
    loadStays,
    addStay,
    removeStay
}

export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit)
