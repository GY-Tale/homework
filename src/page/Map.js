import React, { useState } from 'react'
import { GoogleMap, List, UploadShp } from '../components'
import './Map.css'
function Map() {
    const [markers, setMarker] = useState([])
    const [center, setCenter] = useState([30.67, 104.06])
    const handleClick = (i) => {
        const mark = [Number(markers[i].lat), Number(markers[i].lng)]
        setCenter(mark)
    }
    const updateCenter = (center) => {console.log('center1', center);setCenter([...center])}
    const updatePlaces = (type, p) => {
        if(type === 1) {
            // 添加markers
            const newMarkers = [...markers, p]; 
            setMarker(newMarkers);
        } else if(type === 2){
            // 清空markers
            setMarker(p)
        } else {
            setMarker([])
        }
    }
    return (
        <div className="map-box">
            <GoogleMap 
                updatePlaces={updatePlaces}
                center={center}
                updateCenter={updateCenter}
                places={markers}
            />    
            <List places={markers} onClick={handleClick}/>
            <UploadShp updatePlaces={updatePlaces}/>
        </div>
    )
}

export default Map