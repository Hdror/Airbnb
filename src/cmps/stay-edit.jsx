import React from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { loadStays, addStay, onUpdateStay, removeStay, setCurrStay } from '../store/stay.action.js'
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
            type: 'Loft',
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
            amenities: [],
            host: {
                fullname: '',
                imgUrl: '',
                _id: ''
            },
            loc: {
                country: '',
                city: '',
                countryCode: '',
                address: '',
                lat: 0,
                lng: 0
            },
            reviews: []
        },
        amenities: {
            'Wifi': false,
            'Heating': false,
            'HotTub': false,
            'Dryer': false,
            'Kitchen': false,
            'Microwave': false,
            'Refrigerator': false,
            'Stove': false,
            'TV': false,
            'Oven': false,
            'Hangers': false,
            'Hair dryer': false,
            'Free parking': false,
        }

    }


    componentDidMount() {
        if (this.props.user) {
            const { fullname, imgUrl, _id } = this.props.user
            // TODO // getById to stay and add to stay state
            this.setState((prevState) => ({ stay: { ...prevState.stay, host: { ...this.state.stay.host, fullname, imgUrl, _id } } }))

        }

    }

    onUploadImg = (imgState, position) => {
        const { imgUrls } = this.state.stay
        imgUrls[position] = imgState.imgUrl
        this.setState({ stay: { ...this.state.stay, imgUrls } })
    }

    setAmeneties = () => {
        const { amenities } = this.state
        let amensToSave = []
        for (let amenity in amenities) {
            if (amenities[amenity])
                amensToSave.push(amenity)
        }
        console.log(amensToSave);
        this.setState({ stay: { ...this.state.stay, amenities: amensToSave } }, () => { console.log('SaveAmens', this.state.stay) })
    }

    updateStay = (ev) => {
        ev.preventDefault()

        this.props.addStay(this.state.stay)
        this.cleanForm()
    }


    cleanForm = () => {
        this.setState({
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
        })
    }


    onHandleChange = (ev) => {
        let { target } = ev
        if (target.type < 0) return
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (target.type === 'checkbox') {
            const checked = target.checked
            if (!this.state.amenities[checked]) {
                console.log(field);
                this.setState({ amenities: { ...this.state.amenities, [field]: checked } }, () => { this.setAmeneties() })
            }

        }

        else if (field === 'loc') {

        } else if (field === 'bedrooms' || field === 'beds' || field === 'bathrooms') {
            this.setState((prevState) => ({ stay: { ...prevState.stay, facilites: { ...this.state.stay.facilites, [field]: value } } }), () => { console.log(this.state) })

        } else if (field === 'address') {
            this.setState((prevState) => ({ stay: { ...prevState.stay, loc: { ...this.state.stay.loc, [field]: value } } }), () => { console.log(this.state) })

        } else {
            this.setState((prevState) => ({ stay: { ...prevState.stay, [field]: value } }), () => { console.log(this.state) })
        }



    }

    onRemoveStay = () => {

    }


    render() {
        if (!this.props.stays) return "LOADING"
        const { stay } = this.state
        // const { stays } = this.props

        return (
            <main className="page main-container">
                <div className="stay-edit-container">
                    {/* <div></div> */}
                    <h2>{stay.name}</h2>
                    <span className="stay-edit-location">
                        <span><input type="text" name="name" placeholder="Enter stay name here" onChange={this.onHandleChange} /></span>
                        <span><input type="text" name="address" placeholder="Enter stay address here" onChange={this.onHandleChange} /></span>
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
                                        <li><input type="number" name="capacity" onChange={this.onHandleChange} placeholder="Enter guest capacity" /></li>
                                        <select onChange={this.onHandleChange} name="typeOfPlace" id="">
                                            <option value="Entire Place">Entire Place</option>
                                            <option value="Private Room">Private Room</option>
                                            <option value="Shared Room">Shared Room</option>
                                            <option value="Hotel Room">Hotel Room</option>
                                        </select>
                                        <select onChange={this.onHandleChange} name="type" id="">
                                            <option value="Loft">Loft</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Shared Room">Shared Room</option>
                                            <option value="Hotel">Hotel</option>
                                            <option value="House">House</option>
                                            <option value="Guesthouse">Guesthouse</option>
                                        </select>
                                        <li><input onChange={this.onHandleChange} type="number" name="bedrooms" placeholder="Enter number of bedrooms" /></li>
                                        <li><input onChange={this.onHandleChange} type="number" name="beds" placeholder="Enter number of beds" /></li>
                                        <li><input onChange={this.onHandleChange} type="number" name="bathrooms" placeholder="Enter number of bathrooms" /></li>
                                        <li><input onChange={this.onHandleChange} type="number" name="price" placeholder="Enter price" />${stay.price}</li>
                                    </ul>
                                </section>
                                {/* <div className="host-portrait">
                                    <img src={host.imgUrl} alt="photo needed" />
                                </div> */}
                            </div>
                            <div className="img-upload-container">

                                <Upload
                                    position={0}
                                    onUploadImg={this.onUploadImg}
                                    userImgUrl={this.state.stay.imgUrls[0]} />
                                <Upload
                                    position={1}
                                    onUploadImg={this.onUploadImg}
                                    userImgUrl={this.state.stay.imgUrls[1]} />
                                <Upload
                                    position={2}
                                    onUploadImg={this.onUploadImg}
                                    userImgUrl={this.state.stay.imgUrls[2]} />
                                <Upload
                                    position={3}
                                    onUploadImg={this.onUploadImg}
                                    userImgUrl={this.state.stay.imgUrls[3]} />
                                <Upload
                                    position={4}
                                    onUploadImg={this.onUploadImg}
                                    userImgUrl={this.state.stay.imgUrls[4]} />
                            </div>
                        </div>
                        <div className="stay-edit-perks">
                            <ul className="clean-list">
                                <li><span><img src={Entire_home} alt="" />Entire home</span> <span>You’ll have the apartment to yourself.</span> </li>
                                <li><span><img src={Enhanced_clean} alt="" /> Enhanced Clean</span><span> This Host committed to Airbnb's 5-step enhanced cleaning process.</span></li>
                                <li><span><img src={Self_check_in} alt="" /> Self check-in</span> <span>Check yourself in with the lockbox.</span></li>
                                <li><span><img src={Great_location} alt="" /> Great location</span> <span> 100% of recent guests gave the location a 5-star rating.</span></li>
                            </ul>
                        </div>
                        <div className="stay-edit-summary">
                            <textarea type="text" name="summary" cols="30" rows="30" onChange={this.onHandleChange} ></textarea></div>
                        <section className="stay-edit-amenities-container">
                            <div className="stay-edit-amenities clean-list">
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Wifi" />Wifi</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Heating" />Heating</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="HotTub" />HotTub</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Dryer" />Dryer</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Kitchen" />Kitchen</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Microwave" />Microwave</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Refrigerator" />Refrigerator</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Stove" />Stove</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="TV" />TV</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Oven" />Oven</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Hangers" />Hangers</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Hair dryer" />Hair dryer</div>
                                <div><input onChange={this.onHandleChange} type="checkbox" name="Free parking" />Free Parking</div>
                            </div>
                        </section>
                    </div>
                </div>
                <button onClick={this.updateStay}>Save</button>
            </main>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    changePage,
    onUpdateStay,
    setCurrStay,
    loadStays,
    addStay,
    removeStay
}

export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit)
