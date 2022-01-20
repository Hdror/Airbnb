import React from 'react'
import { useState } from 'react'
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
    MarkerClusterer,
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


export function StayMap(props) {
    const loc = { lat: props.loc.lat, lng: props.loc.lng }

    const [isInfoWindowOpen, setInfo] = useState(false)

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
                    </GoogleMap>
                </LoadScript>
            </div>
        </section>
    )
}