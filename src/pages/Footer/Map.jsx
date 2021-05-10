import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Map() {
    const [zoom, setZoom] = useState(18);
    const center = {
        lat: 15.876816510258282,
        lng: 108.32850184606477,
    };
    return (
        <>
            <div style={{ height: '25vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAR_CDtzLqqS55H_kmxlXDM81Rja8ZZ-VI" }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={15.876816510258282}
                        lng={108.32850184606477}
                        text="Hiệu Giày Như Ý"
                    />
                </GoogleMapReact>
            </div>
        </>
    )
}

export default Map
