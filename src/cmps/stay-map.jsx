import React from 'react'
import { useState } from 'react'
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'
const containerStyle = {
    width: '60vw',
    height: '75vh',
}
const centers = [ // from prev
    {
        lat: 31.777373,
        lng: 34.64148,
    }
]

// console.log(this.state);

export function StayMap(props) {
    const loc = { lat: props.loc.lat, lng: props.loc.lng }
    console.log(loc);
    // const [center, setCenter] = useState(0)
    const [isInfoWindowOpen, setInfo] = useState(false)
    // let branch = ''
    // if (center === 0) branch = 'Yotam ha-Melekh ST. Ashdod' // from prev
    // else if (center === 1) branch = 'Mahal ST. 38, Tel-Aviv'// from prev
    // else branch = 'Ha-Palmakh ST, Haifa'// from prev
    return (
        <section className='map-section'>
            <div>
                <LoadScript googleMapsApiKey='AIzaSyCzuZp75Yeu8Eh4TD1RtRYO3Cxs-R5wNwo'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={loc}
                        zoom={14}
                    >
                        <Marker
                            // onClick={() => {
                            //     setCenter(0)
                            //     setInfo(!isInfoWindowOpen)
                            // }}
                            name={'Current location'}
                            position={loc}
                        />
                        <InfoWindow position={loc}>
                            <h1> Exact location provided after booking </h1>
                        </InfoWindow>

                        <></>
                    </GoogleMap>
                </LoadScript>
            </div>
        </section>
    )
}