import React from 'react';
import classes from './ModalWrapper.module.css';
import BackDrop from '../BackDrop/BackDrop.jsx';
import PropTypes from 'prop-types';

const ModalWrapper = (props) =>{
  return (
    <React.Fragment>
      <BackDrop showBackDrop={props.showBackDrop} clicked={props.backDropClickHandler}/>
      <div className={classes.modal}>
        <header>
          <h3>{props.modalHeader}</h3>
        </header>
        <section>
          {props.modalBody}
        </section>
        <footer>
          {props.modalFooter}
        </footer>
      </div>
    </React.Fragment>);
}

ModalWrapper.propTypes = {
  showBackDrop: PropTypes.bool,
  backDropClickHandler: PropTypes.func,
  modalHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  modalBody : PropTypes.node,
  modalFooter: PropTypes.node
}

ModalWrapper.defaultProps ={
  showBackDrop: false,
  modalHeader : null,
  modalBody : null,
  modalFooter: null
}

export default ModalWrapper;