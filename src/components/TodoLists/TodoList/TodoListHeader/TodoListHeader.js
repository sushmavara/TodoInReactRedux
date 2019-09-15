import React from 'react';
import classes from './TodoListHeader.module.css';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const TodoListHeader = (props) => {
  return(
    <div className={classes.todoListHeader}>
      <input type="checkbox" onChange={props.todoListCheckHandler}></input>
      <h2>{props.todoListTitle}</h2>
    </div>
  )
}

TodoListHeader.propTypes ={
  todoListTitle: PropTypes.string.isRequired,
  todoListCheckHandler: PropTypes.func
}
TodoListHeader.defaultProps = {
  todoListCheckHandler: noop
}
export default TodoListHeader;

