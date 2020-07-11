import React from 'react';
import Trail from './components/Trail';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import TrailSearch from './components/TrailSearch';

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 47.62, lng: -122.19 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

// function App() {
//   return (
//     <div style={{ width: '100vw', height: '100vh'}} >
//     <WrappedMap 
//       googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
//       loadingElement={<div style={{ height: "100%" }} />}
//       containerElement={<div style={{ height: "100%" }} />}
//       mapElement={<div style={{ height: "100%" }} />}
//     />
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      Trails LIVE
      <Trail />

      <TrailSearch />
    </div>
  );
}

export default App;
