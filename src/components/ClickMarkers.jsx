import React, {useState} from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const ClickMarkers = ({handleNewPosition}) => {
  const [positions, setPositions] = useState([])
  useMapEvents({
    click(e) {
      setPositions([...positions, e.latlng])
      handleNewPosition([...positions, e.latlng])
    },
  })

  return positions.map(pos => (
    <Marker key={pos} position={pos}>
      <Popup>Route point</Popup>
    </Marker>
  ))
}

export default ClickMarkers;