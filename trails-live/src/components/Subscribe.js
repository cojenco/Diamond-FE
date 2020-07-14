import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Subscribe.css';
import Modal from 'react-bootstrap4-modal';


const Subscribe = ({trail}) => {
  // event handling methods go here
  const [isOpen, setIsOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

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



  return (
    <div>
      <button class="btn btn-primary" onClick={showModal} >
        Subscribe to Trail
      </button>

      <Modal visible={isOpen} onClickBackdrop={hideModal} className="text-center" >
        <div className="modal-header">
          <h5 className="modal-title text-center"> Subscribe to Trail </h5>
        </div>
        <div className="modal-body">
          <p> {trail.name} <span> ({trail.length} mi)</span> </p>
          <p className="text-muted"> {trail.location} </p>
        </div>
        <form>
          <div class="form-group">
            <label for="tel-input" class="col-form-label">Phone</label>
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
          <button type="button" className="btn btn-primary" onClick={hideModal}>
            Subscribe
          </button>
        </div>
      </Modal>

    </div>

  );
}

export default Subscribe;