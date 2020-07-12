import React from 'react';
import Trail from './components/Trail';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
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

    <Router>
      <div>
        <nav>
        </nav>


        <Switch>
          <Route path="/trails-search">
            <TrailSearch />
          </Route>
          <Route path="/trail">
            <Trails />
          </Route>
          <Route path="/">
            <TrailSearch />
          </Route>

        </Switch>
      </div>
    </Router>

    // <div className="App container">
    //   <h1> Trails LIVE </h1>

    //   <TrailSearch />
    // </div>
  );
}

const Trails = () => {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:externalID`}>
          <ATrail />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic. </h3>
        </Route>
      </Switch>
    </div>
  );
}

const ATrail = () => {
  let { externalID } = useParams();
  return (
    <Trail externalID={externalID} />
  );
}

export default App;
