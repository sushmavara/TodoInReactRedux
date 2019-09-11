import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = (props) => {
  let finalCssClass =[];
  if(props.classNames) {
    finalCssClass= props.classNames.split(' ');
  }
  return (
      <button onClick={props.clicked}
              className={finalCssClass.concat(classes.button).join(' ')} disabled={props.isDisabled}>
        {props.children}
      </button>
  );
}

Button.propTypes = {
  clicked: PropTypes.func.isRequired,
  classNames : PropTypes.string,
  isDisabled : PropTypes.bool
}

Button.defaultProps = {
  classNames:null,
  isDisabled: false
}

export default Button;