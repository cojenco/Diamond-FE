import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TrailSearch.css';
import axios from 'axios';
import SearchResult from './SearchResult';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";


const TrailSearch = (props) => {

  const [ stateSelected, setStateSelected ] = useState({value: ''});
  const [ searchBar, setSearchBar ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ keywordResults, setKeywordResults ] = useState([]);
  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'

  const onInputChange = (event) => {
		let newSearch = { ...searchBar };
		newSearch = event.target.value;
    setSearchBar(newSearch);
  };

  const onSelectState = (event) => {
    setStateSelected({value: event.target.value});
    setKeywordResults([]);
    console.log(stateSelected);

    axios
    .get(`${BASE_URL}/all-trails/${event.target.value}`)
    .then((response) => {
      console.log(response.data.trails);
      const newSearchResults = response.data.trails;
      setSearchResults(newSearchResults);
    })
    .catch((error) => {
      console.log(error.message);
    })
  };

  // const onSearchSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //   .get(`${BASE_URL}/all-trails/`)
  //   .then((response) => {
  //     console.log(response.data.trails);
  //     const newSearchResults = response.data.trails;
  //     setSearchResults(newSearchResults);
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   })
  // }

  const onSearchSubmit = (event) => {
    event.preventDefault();

    const newKeywordResults = searchResults.filter(trail => trail.name.toLowerCase().includes(searchBar.toLowerCase()));
    setKeywordResults(newKeywordResults);
    setSearchBar('');
  }

  // const onSelectSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //   .get(`${BASE_URL}/all-trails/${stateSelected.value}`)
  //   .then((response) => {
  //     console.log(response.data.trails);
  //     const newSearchResults = response.data.trails;
  //     setSearchResults(newSearchResults);
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   })
  // }

  const allSearchResults = searchResults.map((trail) => {
    return (
      <div key={trail.id}>
        {trail.name}
      </div>
    );
  })

  const allKeywordResults = keywordResults.map((trail) => {
    return (
      <SearchResult key={trail.id} trail={trail} />
    );
  })


  return (
    <div className="container d-flex flex-column" >

      {/* <form onSubmit={onSelectSubmit}> */}
        <select value={stateSelected.value} onChange={onSelectState} className="custom-select">
          <option defaultValue>Select State</option>
          <option value="WA">WA</option>
          <option value="WI">WI</option>
          <option value="WV">WV</option>
          <option value="WY">WY</option>
        </select>
      {/* </form> */}


      <form onSubmit={ onSearchSubmit } className="align-self-center" >
        <div className="input-group">
          <input
            type='type'
            name='query'
            className='searchbox'
            onChange={onInputChange}
            value={searchBar}
          />
          <div className="input-group-append">
            <input
              className="btn btn-secondary btn-style bg-dark"
              type="submit"
              name="submit"
              value="Search"
              onClick={ onSearchSubmit }
            />
          </div>
        </div>
      </form>

      {/* <h3>Keyword Results</h3> */}
      {allKeywordResults}

      {/* <h3>Explore Trails in {stateSelected.value} </h3>
      {allSearchResults} */}

    </div>

  )
}

const COORDINATES = {
  'WA' : {
    'lat' : 47.751074,
    'lng' : -120.740139,
  },
  'WI' : {
    'lat' : 43.78444,
    'lng' : -88.787868,
  },
  'WV' : {
    'lat' : 38.597626,
    'lng' : -80.454903,
  },
  'WY' : {
    'lat' : 43.075968,
    'lng' : -107.290284,
  },
}

export default TrailSearch;
