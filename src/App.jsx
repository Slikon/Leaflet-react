import React, {useState} from 'react';
import './App.css';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import DisplayRoute from './components/DisplayRoute';
import 'react-dropdown/style.css';
import ClickMarkers from './components/ClickMarkers';

function App() {
  const [markerPositions, setPositions] = useState([]);
  const [graphCoordinates, setGraphCoordinates] = useState([]);
  
  const handleNewPosition = (position) => {
    setPositions(position)
  }

  const setGraphCoords = (coordinatesArray) => {
    if(!coordinatesArray[0]){
      alert("Can't build path for this route")
    } else {
      setGraphCoordinates([coordinatesArray]);
    }
  }
  
  return (
    <div>
      <MapContainer className='map' center={[50.272796, 30.31428]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickMarkers handleNewPosition={handleNewPosition} />
        {graphCoordinates.map(pair => (
        <Polyline key={pair} positions={pair}/>
      ))}
      </MapContainer>
      <DisplayRoute markers={markerPositions} setGraphCoords={setGraphCoords} />
    </div>
  );
}
export default App;
