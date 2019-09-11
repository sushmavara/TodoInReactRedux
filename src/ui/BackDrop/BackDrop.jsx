import React from 'react';
import classes from './BackDrop.module.css';
import PropTypes from 'prop-types';

const BackDrop = (props) => {
  return (
    (props.showBackDrop) && <div className={classes.backDrop} onClick={props.clicked} />
  );
}

BackDrop.propTypes = {
  showBackDrop: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default BackDrop;