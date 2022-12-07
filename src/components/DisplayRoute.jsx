import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Polyline, Popup, Rectangle, TileLayer, useMap, LineString, useMapEvents } from 'react-leaflet';
import ClickMarkers from "./ClickMarkers";
import './DisplayRoute.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { calculateRoute } from "../clients/orsClient";
import { createPayload, getResultsFromResponse } from "../utils";

const DisplayRoute = ({ markers, setGraphCoords }) => {
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);

  const [carType, setCarType] = useState(null);
  const [fragileCargo, setFragileCargo] = useState(false);
  const [maxSpeed, setMaxSpeed] = useState(80);
  
  const carTypes = [
    'Car', 'Heavy goods car'
  ];

  const carDropdownValueChanged = (newValue) => {
    setCarType(newValue.value)
  };


  const submitButtonOnClick = async () => {
    const payload = createPayload({markers, carType, fragileCargo, maxSpeed})
    console.log(payload);
    calculateRoute(payload)
      .then(res => {
        const { coordinates, duration, distance } = getResultsFromResponse(res);
        setGraphCoords(coordinates);
        setDistance(distance)
        setDuration(duration)
      })
      .catch(err => err);
  }

  return (
    <div className="form">
      <div className="form-fields">
        <h1>Parameters</h1>
        <div className="params cargo-select">
          <b>Cargo type:</b>
          <Dropdown className="dropdown" options={carTypes} onChange={carDropdownValueChanged} value={carTypes[0]} placeholder="Select an option" />
        </div>
        <div className="params max-speed">
          <b>Max speed (km/h):</b>
          <input type="search" name="speed" id="speed" placeholder=">80" onChange={(e) => {
            setMaxSpeed(e.target.value)
          }} />
        </div>
        <div className="params fragile-cargo">
          <b>Fragile cargo:</b>
          <input type="checkbox" name="fragile" id="fragile" onChange={(e) => {
            setFragileCargo(e.target.checked)
          }} />
        </div>
        <div className="submit-instructions">
          <b>Select route points and submit route:</b>
          <input type="button" value="Submit route" className="button submit-button" onClick={submitButtonOnClick} />
        </div>
      </div>
      <div className="form-results">
        <h1>Results</h1>
        {!!duration && (<span className="line"><b>Time:</b><b>{duration} hrs</b></span>)}
        {!!distance && (<span className="line"><b>Distance:</b><b>{distance} km</b></span>)}
      </div>
    </div>
  )
}

export default DisplayRoute;
