import React from 'react'
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '35vh',
}


export function StayMap(props) {
    const loc = { lat: props.loc.lat, lng: props.loc.lng }
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
                            name={'Current location'}
                            position={loc}
                        />
                        <InfoWindow position={loc}>
                            <h1>Exact location provided after booking</h1>
                        </InfoWindow>
                    </GoogleMap>
                </LoadScript>
            </div>
        </section>
    )
}