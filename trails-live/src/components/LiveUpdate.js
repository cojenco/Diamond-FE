import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './LiveUpdate.css';
import Modal from 'react-bootstrap4-modal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import CloudIcon from '@material-ui/icons/Cloud';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import GrainIcon from '@material-ui/icons/Grain';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Button from '@material-ui/core/Button';



const LiveUpdate = ({trail}) => {

  const BASE_URL = 'http://127.0.0.1:8000/diamondtrails'

  const [isOpen, setIsOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [statusUpdate, setStatusUpdate] = useState({});


  const showModal = () => {
    setIsOpen(true);
  }


  const hideModal = () => {
    setStatusUpdate({});
    setIsOpen(false);
  }


  const onLiveUpdateClick = () => {
    // create params for API call
    const externalID = trail.id
    const params = {
      'phone': phoneInput,
      'trail': trail.name,
      'external_id': externalID,
    };
    console.log(params);
    // make API Call to save subscription to DB
    // axios
    // .post(`${BASE_URL}/trail/${externalID}/subscribe`, params)
    // .then((response) => {
    //   console.log(response.data);
    //   console.log('SENT OUT?!!!')
    // setIsOpen(false);
    // setPhoneInput('');
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });
  }

  const onWeatherClick = (event) => {

    console.log(event);
    console.log(event.value);
    console.log(event.target.value);
    const update = {
      'category': event.target.name,
      'message': event.target.id,
      'external_id': trail.id,
    };

    console.log(update);
    setStatusUpdate(update);
  }


  return (
    <div>
      <button className="btn btn-warning" onClick={showModal} >
        Update Live Status
      </button>


      <Modal visible={isOpen} onClickBackdrop={hideModal} className="text-center" >
        <div className="modal-header text-center">
          <h5 className="modal-title text-center"> Update Live Status </h5>
        </div>

        <div className="modal-body">
          <h6> {trail.name} <span> ({trail.length} mi)</span> </h6>
          <p className="text-muted"> {trail.location} </p>
        </div>


        <div className="d-flex flex-row justify-content-center" >
        <div className="custom-control custom-radio">
          
          <label className="custom-control-label" htmlFor="Sun">          
          <IconButton color="secondary" aria-label="Sun" data-toggle="tooltip" data-placement="top" title="sun">
            <WbSunnyIcon />
          </IconButton>
          </label>
          <input type="radio" id="Sun" name="Weather" className="custom-control-input" onClick={onWeatherClick} />
        </div>
        <div className="custom-control custom-radio">
          <input type="radio" id="Rain" name="Weather" className="custom-control-input" onClick={onWeatherClick} />
          <label className="custom-control-label" htmlFor="Rain">          
          <IconButton color="primary" aria-label="Rain" data-toggle="tooltip" data-placement="top" title="rain">
            <BeachAccessIcon />
          </IconButton>
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input type="radio" id="Thunder" name="Weather" className="custom-control-input" onClick={onWeatherClick} />
          <label className="custom-control-label" htmlFor="Thunder">          
          <IconButton color="secondary" aria-label="Thunder" data-toggle="tooltip" data-placement="top" title="thunder" >
            <FlashOnIcon />
          </IconButton>
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input type="radio" id="Hail" name="Weather" className="custom-control-input" onClick={onWeatherClick} />
          <label className="custom-control-label" htmlFor="Hail">          
          <IconButton color="secondary" aria-label="Hail" data-toggle="tooltip" data-placement="top" title="hail" >
            <GrainIcon />
          </IconButton>
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input type="radio" id="Snow" name="Weather" className="custom-control-input" onClick={onWeatherClick} />
          <label className="custom-control-label" htmlFor="Snow">          
          <IconButton color="primary" aria-label="Snow" onClick={onWeatherClick} value="Snow" data-toggle="tooltip" data-placement="top" title="snow" >
            <AcUnitIcon name="Snow" />
          </IconButton>
          </label>
        </div>
        </div>

        {/* <Button
          variant="contained"
          color="primary"
          size="large"
          className=""
          startIcon={<FlashOnIcon />}
          onClick={onWeatherClick}
          value="Thunder"
        >
          Thunder
        </Button> */}



        {/* <div>
          <IconButton color="secondary" aria-label="add an alarm" onClick={hideModal} data-toggle="tooltip" data-placement="top" title="sun">
            <WbSunnyIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm" onClick={hideModal} data-toggle="tooltip" data-placement="top" title="rain">
            <BeachAccessIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add an alarm" onClick={hideModal} data-toggle="tooltip" data-placement="top" title="thunder" >
            <FlashOnIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm" onClick={hideModal} data-toggle="tooltip" data-placement="top" title="hail" >
            <GrainIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add an alarm" onClick={onWeatherClick} value="Snow" data-toggle="tooltip" data-placement="top" title="snow" >
            <AcUnitIcon name="Snow" />
          </IconButton>
        </div> */}


        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={hideModal}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onLiveUpdateClick}>
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default LiveUpdate;