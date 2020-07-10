import React from 'react';
import PropTypes from 'prop-types';
import './Trail.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const Trail = (props) => {
  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 47.62, lng: -122.19 }}
      >
        <Marker position={{ lat: 47.6551, lng: -122.1847 }} />
      </GoogleMap>
    );
  }
  
  const WrappedMap = withScriptjs(withGoogleMap(Map))
  
  // should be nested inside the return
  // <div style={{ width: '100vw', height: '50vh'}} >
  //   <WrappedMap 
  //     googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
  //     loadingElement={<div style={{ height: "100%" }} />}
  //     containerElement={<div style={{ height: "100%" }} />}
  //     mapElement={<div style={{ height: "100%" }} />}
  //   />
  // </div>


  return (
    <div>
      <h1>Single Trail Componenet</h1>
      <h2>Bridle Trails State Park - Outer Loop</h2>
    </div>
  )
}

export default Trail;