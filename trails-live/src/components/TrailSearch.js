import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TrailSearch.css';
import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";


const TrailSearch = (props) => {

  const [ searchBar, setSearchBar ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'

  const onInputChange = (event) => {
		let newSearch = { ...searchBar };
		newSearch = event.target.value;
    setSearchBar(newSearch);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();

    axios
    .get(`${BASE_URL}/all-trails/`)
    .then((response) => {
      console.log(response.data.trails);
      const newSearchResults = response.data.trails;
      setSearchResults(newSearchResults);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  const allSearchResults = searchResults.map((trail) => {
    return (
      <div key={trail.id}>
        {trail.name}
      </div>
    );
  })


  return (
    <div className="container d-flex flex-column" >
      <h1>TRAILSEARCH</h1>
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

      {allSearchResults}

    </div>

  )
}

export default TrailSearch;
