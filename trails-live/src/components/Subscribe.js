import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Subscribe.css';
import Modal from 'react-bootstrap4-modal';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';


const Subscribe = ({trail}) => {

  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'

  const [isOpen, setIsOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');


  const showModal = () => {
    setIsOpen(true);
  }


  const hideModal = () => {
    setIsOpen(false);
  }


  const onPhoneInputChange = (event) => {
    let newInput = { ...phoneInput };
		newInput = event.target.value;
    setPhoneInput(newInput);
  }


  const onSubscribeClick = () => {
    // create params for API call
    const externalID = trail.id
    const params = {
      'phone': phoneInput,
      'trail': trail.name,
      'external_id': externalID,
    };
    console.log(params);
    // make API Call to save subscription to DB
    axios
    .post(`${BASE_URL}/trail/${externalID}/subscribe`, params)
    .then((response) => {
      console.log(response.data);
      console.log('SENT OUT?!!!')
    setIsOpen(false);
    setPhoneInput('');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }


  return (
    <div>
      {/* <button className="btn btn-outline-danger" onClick={showModal} >
        ❤️ Subscribe to Trail
      </button> */}

      <Button
        variant="contained"
        color="secondary"
        size="large"
        className=""
        startIcon={<FavoriteIcon />}
        onClick={showModal}
        value="Thunder"
      >
        Subscribe to Trail
      </Button>


      <Modal visible={isOpen} onClickBackdrop={hideModal} className="text-center" >
        <div className="modal-header text-center">
          <h5 className="modal-title text-center"> Subscribe to Trail </h5>
        </div>

        <div className="modal-body">
          <h6> {trail.name} <span> ({trail.length} mi)</span> </h6>
          <p className="text-muted"> {trail.location} </p>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="tel-input" className="col-form-label">Enter Mobile to Receive SMS Updates</label>
            <input
            type='tel'
            name='tel-input'
            className='form-control phoneinput'
            placeholder='4251235678'
            pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
            required
            onChange={onPhoneInputChange}
            value={phoneInput}
          />
          </div>
        </form>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={hideModal}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onSubscribeClick}>
            Subscribe
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Subscribe;