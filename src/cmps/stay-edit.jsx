import React from "react"

// STORE
import { connect } from 'react-redux'
import { loadStays, addStay, onUpdateStay, removeStay, setCurrStay } from '../store/stay.action.js'
import { changePage } from '../store/page.action.js'

// COMPONENTS
import { Loader } from '../cmps/loader.jsx'
import { Upload } from './upload.jsx'
// import { resetUploads } from './upload.jsx'

// Utils
import { getAllAmenities, utilService } from '../services/util.service.js'

// SVG
import Enhanced_clean from '../assest/svg/perks/Enhanced_clean.svg'
import Entire_home from '../assest/svg/perks/Entire_home.svg'
import Great_location from '../assest/svg/perks/Great_location.svg'
import Self_check_in from '../assest/svg/perks/Self_check_in.svg'

class _StayEdit extends React.Component {
    state = {
        stay: {
            name: '',
            type: 'Loft',
            typeOfPlace: "Entire place",
            imgUrls: [],
            price: 0,
            summary: '',
            capacity: '',
            facilites: {
                beds: '',
                bedrooms: '',
                bathrooms: ''
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
        this.setState({ stay: { ...this.state.stay, amenities: amensToSave } })
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
                type: 'Loft',
                typeOfPlace: 'Entire place',
                imgUrls: [],
                price: 0,
                summary: '',
                capacity: '',
                facilites: {
                    beds: '',
                    bedrooms: '',
                    bathrooms: ''
                },
                amenities: [],
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
                this.setState({ amenities: { ...this.state.amenities, [field]: checked } }, () => { this.setAmeneties() })

            }

        } else if (field === 'bedrooms' || field === 'beds' || field === 'bathrooms') {
            this.setState((prevState) => ({ stay: { ...prevState.stay, facilites: { ...this.state.stay.facilites, [field]: value } } }))
        }
        else if (field === 'address') {
            this.setState((prevState) => ({ stay: { ...prevState.stay, loc: { ...this.state.stay.loc, [field]: value } } }))

        } else {
            this.setState((prevState) => ({ stay: { ...prevState.stay, [field]: value } }))
        }

    }

    render() {
        if (!this.props.stays) return <Loader />
        const { stay } = this.state
        const amenities = utilService.getAllAmenities()
        return (
            <main className="stay-edit">
                <div className="stay-edit-location flex">
                    <input type="text" value={stay.name ? stay.name : ''} name="name" placeholder="Enter stay name here" onChange={this.onHandleChange} />
                    <input value={stay.loc.address ? stay.loc.address : ''} type="text" name="address" placeholder="Enter stay address here" onChange={this.onHandleChange} />
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
                <div className="info-container">
                   
                    <div className="selection-container flex">
                        <input title='Guest capacity' type="number" value={stay.capacity ? stay.capacity : ''} name="capacity" onChange={this.onHandleChange} placeholder="Enter guest capacity" />
                        <select value={stay.typeOfPlace} onChange={this.onHandleChange} name="typeOfPlace" id="">
                            <option value="Entire Place">Entire Place</option>
                            <option value="Private Room">Private Room</option>
                            <option value="Shared Room">Shared Room</option>
                            <option value="Hotel Room">Hotel Room</option>
                        </select>

                        <select value={stay.type} onChange={this.onHandleChange} name="type" id="">
                            <option value="Loft">Loft</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Shared Room">Shared Room</option>
                            <option value="Hotel">Hotel</option>
                            <option value="House">House</option>
                            <option value="Guesthouse">Guesthouse</option>
                        </select>

                        <input onChange={this.onHandleChange} value={stay.facilites.bedrooms ? stay.facilites.bedrooms : ''} type="number" name="bedrooms" placeholder="Enter number of bedrooms" />
                        <input onChange={this.onHandleChange} value={stay.facilites.beds ? stay.facilites.beds : ''} type="number" name="beds" placeholder="Enter number of beds" />
                        <input onChange={this.onHandleChange} value={stay.facilites.bathrooms ? stay.facilites.bathrooms : ''} type="number" name="bathrooms" placeholder="Enter number of bathrooms" />
                        <input onChange={this.onHandleChange} value={stay.price > 0 ? stay.price : ''} type="number" name="price" placeholder="Enter price" />
                    </div>
                    {/* ${stay.price}</div> */}
                    {/* <div className="stay-edit-perks">
                            <ul className="clean-list">
                                <li><span><img src={Entire_home} alt="" />Entire home</span> <span>You’ll have the apartment to yourself.</span> </li>
                                <li><span><img src={Enhanced_clean} alt="" /> Enhanced Clean</span><span> This Host committed to Airbnb's 5-step enhanced cleaning process.</span></li>
                                <li><span><img src={Self_check_in} alt="" /> Self check-in</span> <span>Check yourself in with the lockbox.</span></li>
                                <li><span><img src={Great_location} alt="" /> Great location</span> <span> 100% of recent guests gave the location a 5-star rating.</span></li>
                            </ul>
                        </div> */}
                    <div className="summary-container">
                        <textarea value={stay.summary ? stay.summary : ''} type="text" name="summary" cols="30" rows="30" onChange={this.onHandleChange} ></textarea>
                        <div className="stay-edit-amenities">
                            {amenities.map((amenity, idx) => {
                                return <div className="amenity-checkbox flex" key={idx}><input onChange={this.onHandleChange} type="checkbox" checked={this.state.amenities[amenity]} name={amenity} />{amenity}</div>
                            })}
                        </div>
                    </div >
         
                </div >
                <div onClick={this.updateStay}>Save</div>
            </main >
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
