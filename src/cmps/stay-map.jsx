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
const centers = [
    {
        lat: 31.777373,
        lng: 34.64148,
    },
    {
        lat: 32.049062,
        lng: 34.80576,
    },
    {
        lat: 32.838179,
        lng: 35.08731,
    },
]
export function StayMap() {
    const [center, setCenter] = useState(0)
    const [isInfoWindowOpen, setInfo] = useState(false)
    let branch = ''
    if (center === 0) branch = 'Yotam ha-Melekh ST. Ashdod'
    else if (center === 1) branch = 'Mahal ST. 38, Tel-Aviv'
    else branch = 'Ha-Palmakh ST, Haifa'
    return (
        <section className='map-section'>
            <div>
                <LoadScript googleMapsApiKey='AIzaSyCzuZp75Yeu8Eh4TD1RtRYO3Cxs-R5wNwo'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centers[center]}
                        zoom={14}
                    >
                        <Marker
                            onClick={() => {
                                setCenter(0)
                                setInfo(!isInfoWindowOpen)
                            }}
                            name={'Current location'}
                            position={centers[0]}
                        />
                        <Marker
                            onClick={() => {
                                setCenter(1)
                                setInfo(!isInfoWindowOpen)
                            }}
                            name={'Current location'}
                            position={centers[1]}
                        />
                        <Marker
                            onClick={() => {
                                setCenter(2)
                                setInfo(!isInfoWindowOpen)
                            }}
                            name={'Current location'}
                            position={centers[2]}
                        />
                        <InfoWindow position={centers[center]}>
                            <h1> Exact location provided after booking </h1>
                        </InfoWindow>

                        <></>
                    </GoogleMap>
                </LoadScript>
            </div>
        </section>
    )
}