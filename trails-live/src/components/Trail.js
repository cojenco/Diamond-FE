import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Trail.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import axios from 'axios';

const Trail = ({ externalID }) => {
  const [ trailData, setTrailData ] = useState({});
  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'


  // Make API call when componentDidMount 
  useEffect(() => {
    axios
    .get(`${BASE_URL}/trail/${externalID}`)
    .then((response) => {
      console.log(response.data.trails[0]);
      console.log('JOYFUL tears! Received data from all these layers')
      const newTrailData = response.data.trails[0];
      setTrailData(newTrailData);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }, []);


  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: trailData.latitude, lng: trailData.longitude }}
      >
        <Marker position={{ lat: trailData.latitude, lng: trailData.longitude }} />
      </GoogleMap>
    );
  }
  
  const WrappedMap = withScriptjs(withGoogleMap(Map))
  
  // should be nested inside the return ///////////
  // <div style={{ width: '100vw', height: '50vh'}} >
  //   <WrappedMap 
  //     googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
  //     loadingElement={<div style={{ height: "100%" }} />}
  //     containerElement={<div style={{ height: "100%" }} />}
  //     mapElement={<div style={{ height: "100%" }} />}
  //   />
  // </div>
  //////////////////////////////////////////////////


  return (
    <div className="container ">

      <div className="card w-75">
        <img className="card-img" src={trailData.imgMedium} alt="Card image" />
        <div className="card-img-overlay">
          <p className="card-text"></p>
        </div>
      </div>


      <h3>{ trailData.name }</h3>
      <p> 
        <span> {trailData.location} </span> 
        {/* <span> {trailData.length} mi </span> */}
      </p>
      {/* <p>external_id is {externalID} </p> */}
      <p> ❤️ oo people subscribed </p>

      <div>
        <a href="#!" className="btn btn-outline-danger"> ❤️ Subscribe to Trail</a>
        <a href="#!" className="btn btn-outline-warning"> ⚡ Update Live Status</a>
      </div>

      <div className="card-deck">
        <div className="card">
          <div className="card-header">
            <p> 🅿️ Parking </p>
          </div>
          <div className="card-body">
            <p className="card-text"> 75% Full</p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <p> ❄️ Weather </p>
          </div>
          <div className="card-body">
            <p className="card-text"> Thunder</p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <p> 🥾 Visitors </p>
          </div>
          <div className="card-body">
            <p className="card-text"> 🦶🦶🦶🦶🦶👩🏻‍🤝‍👩🏽👩🏻‍🤝‍👩🏽‍🦶👣</p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <p> 🚧 Other Conditions Update </p>
        </div>
        <div className="card-body">
          <a className="card-link"> {trailData.conditionStatus} </a>
          <a className="card-link"> {trailData.conditionDetails} </a>
          <a className="card-link"> {trailData.conditionDate} </a>
        </div>
      </div>

      

      <div className="card">
        <div className="card-body">
          <h4 className="card-title">  {trailData.name} </h4>
          
          <p className="card-text mb-2 text-muted"> {trailData.summary} </p>
          <p className="card-text mb-2"> {trailData.location} </p>
          <p className="card-text mb-2"> {trailData.length} Miles </p>
          <p className="card-text mb-2 "> {trailData.ascent}' Up </p>
          <p className="card-text mb-2 "> {trailData.descent}' Down </p>
        </div>
      </div>

      {/* <div style={{ width: '100vw', height: '50vh'}} >
        <WrappedMap 
          googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div> */}

    </div>
  )
}

export default Trail;