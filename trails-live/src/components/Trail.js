import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Trail.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import axios from 'axios';
import Subscribe from './Subscribe';


const Trail = ({ externalID }) => {
  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'
  const emptyStatus = [{'message': 'SHARE LIVE STATUS', 'created_at': ''}]

  const [ trailData, setTrailData ] = useState({});
  const [ parkingStats, setParkingStats ] = useState(emptyStatus);
  const [ visitorStats, setVisitorStats ] = useState(emptyStatus);
  const [ weatherStats, setWeatherStats ] = useState(emptyStatus);
  const [ subscriptions, setSubscriptions ] = useState(0);


  // Make API call when componentDidMount 
  useEffect(() => {
    axios
    .get(`${BASE_URL}/trail/${externalID}`)
    .then((response) => {
      console.log(response.data.trails[0]);
      console.log('JOYFUL tears! Received data from all these layers')
      console.log(response.data.weather_updates);
      const newTrailData = response.data.trails[0];
      setTrailData(newTrailData);
      setSubscriptions(response.data.subscriptions);
      setWeatherStats(response.data.weather_updates);
      setParkingStats(response.data.parking_updates);
      setVisitorStats(response.data.visitor_updates);

    })
    .catch((error) => {
      console.log(error.message);
    })
  }, []);

  const weather_stat = () => {
    let stats = emptyStatus[0].message;
    if ( weatherStats.length !== 0 ) {
      stats = weatherStats[0].message;
    } 

    return stats;
  }

  const weather_timestamp = () => {
    let stats = emptyStatus[0].created_at;
    if ( weatherStats.length !== 0 ) {
      stats = weatherStats[0].created_at;
    } 

    return stats;
  }


  const parking_stat = () => {
    let stats = emptyStatus[0].message;
    if ( parkingStats.length !== 0 ) {
      stats = parkingStats[0].message;
    } 

    return stats;
  }

  const parking_timestamp = () => {
    let stats = emptyStatus[0].created_at;
    if ( parkingStats.length !== 0 ) {
      stats = parkingStats[0].created_at;
    } 

    return stats;
  }


  const visitor_stat = () => {
    let stats = emptyStatus[0].message;
    if ( visitorStats.length !== 0 ) {
      stats = visitorStats[0].message;
    } 

    return stats;
  }


  const visitor_timestamp = () => {
    let stats = emptyStatus[0].created_at;
    if ( visitorStats.length !== 0 ) {
      stats = visitorStats[0].created_at;
    } 

    return stats;
  }


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
    <div className="container trail-main-container ">

      <div className="card">
        <img className="card-img trail-img" src={trailData.imgMedium} alt="Card image" />
        <div className="card-img-overlay">
          <p className="card-text"></p>
        </div>
      </div>


      <h3>{ trailData.name }</h3>
      <p> 
        <span> {trailData.location} </span> 
        {/* <span> {trailData.length} mi </span> */}
      </p>

      <p> ❤️  {subscriptions} subscribed within past 3 days </p>

      <div>
        {/* <a href="#!" className="btn btn-outline-danger"> ❤️ Subscribe to Trail</a> */}
        <a href="#!" className="btn btn-outline-warning"> ⚡ Update Live Status</a>
      </div>


      <Subscribe trail={trailData} />

    
      <div className="card-deck">
        <div className="card">
          <img className="card-img card-img-top" src="https://lh3.googleusercontent.com/pw/ACtC-3cnK49FbkKIBreGnKxXexLYxK_Ta57aITBbQE4yYtRyV3foDMd9HyGBpUouADLSY4Q0dda1BzXbAhyUSFSoVTu7WjDpcCl5Drl9G2ndLkD-M3xiYW-PzMnjINXnr5erFkWNK3b9VqlQJneARaytSH2FgA=w1692-h1128-no?authuser=0" alt="Card image cap" />
          <div className="card-img-overlay text-center text-light">
            <h3> Parking </h3>
          </div>
          <div className="card-body">
            <p className="card-text">🅿️ Parking {parking_stat()} </p>
            <a className="card-link"> {parking_timestamp()} </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>

        <div className="card">
          <img className="card-img card-img-top" src="https://lh3.googleusercontent.com/pw/ACtC-3f_QJYX55Fplkf43FB_1lXkjVLOj879wdVAiqOJiXkoUaP1fw_suexKflTRns3kQO1KRVj3jezRQT5V9JeutIc8UHRqRrFG9IiToFRoounFyIWAqJaQ1_40R6fvQ2BNczZ12YGQILNUxM6AzXn98xuvQg=w1840-h1226-no?authuser=0" alt="Card image cap" />
          <div className="card-img-overlay text-center text-light">
            <h3> Visitors </h3>
          </div>
          <div className="card-body">
            <p className="card-text"> 🥾 Visitors {visitor_stat()} </p>
            <a className="card-link"> {visitor_timestamp()} </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>

        <div className="card">
          <img className="card-img card-img-top" src="https://lh3.googleusercontent.com/pw/ACtC-3e6hm4nmqR9HWG4fPUvAyeWoSo34lYA9J0vv01VgLPbI4zyvEZ-CESUVZnycYH-Xv6_M9MXnGFRPVZFPM_IFqY6ExQPKlM-2bGW9FOzuYEzevXsKz97QIbEg39i4zPXueR1GQk_jVD3uYtODbqBt8X8ZQ=w1840-h1226-no?authuser=0" alt="Card image cap" />
          <div className="card-img-overlay text-center text-light">
            <h3> Weather </h3>
          </div>
          <div className="card-body">
            <p className="card-text"> ❄️ Weather {weather_stat()} </p>
            <a className="card-link"> {weather_timestamp()} </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
      </div>

      { trailData.conditionStatus == 'Unknown' ? "" :
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
      }

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

      {/* CURRENTLY END OF PAGE */}

      {/* <div style={{ width: '85vw', height: '50vh'}} >
        <WrappedMap 
          googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div> */}


      {/* <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <p className="card-text">🅿️ Parking </p>
          </div>
          <img src="https://lh3.googleusercontent.com/pw/ACtC-3d8CpznyJCbdbAsNomKbBcF_jz5Yj1xGF0OdePC_XArTlw2q9T0q7_W-DHbrzwRsoOpt8rDfpnCk1e3t5FWH6OSe9_8oiId052ykWxZht4SEl5QrpMm6az20iE6TMAzUX9f4cDwRu4-tvk9WUUIvLiavw=w1840-h1226-no?authuser=0" alt="Card image" className="status-img" />
          <div className="card-body">
            <p className="card-text">75% Full</p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text"> ❄️ Weather </p>
          </div>
          <img src="https://lh3.googleusercontent.com/pw/ACtC-3e6hm4nmqR9HWG4fPUvAyeWoSo34lYA9J0vv01VgLPbI4zyvEZ-CESUVZnycYH-Xv6_M9MXnGFRPVZFPM_IFqY6ExQPKlM-2bGW9FOzuYEzevXsKz97QIbEg39i4zPXueR1GQk_jVD3uYtODbqBt8X8ZQ=w1840-h1226-no?authuser=0" alt="Card image" className="status-img" />
          <div className="card-body">
            <p className="card-text"> Thunder </p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text"> 🥾 Visitors </p>
          </div>
          <img src="https://lh3.googleusercontent.com/pw/ACtC-3f_QJYX55Fplkf43FB_1lXkjVLOj879wdVAiqOJiXkoUaP1fw_suexKflTRns3kQO1KRVj3jezRQT5V9JeutIc8UHRqRrFG9IiToFRoounFyIWAqJaQ1_40R6fvQ2BNczZ12YGQILNUxM6AzXn98xuvQg=w1840-h1226-no?authuser=0" alt="Card image" className="status-img" />
          <div className="card-body">
            <p className="card-text"> 5-10 ppl within 0.1mi</p>
            <a className="card-link"> timestamp here </a>
            <a href="#!" className="card-link"> See History </a>
          </div>
        </div>
      </div> */}


      {/* <div className="card-deck">
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
      </div> */}


    </div>
  )
}

export default Trail;