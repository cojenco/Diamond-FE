import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchResult.css';


const SearchResult = ({ trail }) => {


  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title"> <a href={`/trail/${trail.id}`}> {trail.name} </a> </h4>
        
        
        <p className="card-text mb-2 text-muted"> {trail.summary} </p>
        <a className="card-link"> {trail.location} </a>
        <a className="card-link"> {trail.length} mi</a>
      </div>
    </div>
  );
}


export default SearchResult;