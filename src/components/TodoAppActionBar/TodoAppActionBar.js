import React from 'react';
import classes from './TodoAppActionBar.module.css';
import {SHOW_TODO_LIST_ADD_DATA_MODAL,SHOW_TODO_LIST_DELETE_MODAL} from '../../constants/TodoListDataModalConstants'
import PropTypes from 'prop-types';
import Button from '../../ui/Button/Button';

const TodoAppActionBar = (props) => {    

  const displayAddNewTodoListModal = () =>{
    props.modalDisplayHandler(SHOW_TODO_LIST_ADD_DATA_MODAL,true);
  }

  const displayDeleteTodoListModal = () =>{
    props.modalDisplayHandler(SHOW_TODO_LIST_DELETE_MODAL,true);
  }

  let isDeleteBtnDisabled = props.todoListsLength === 0;

  return (
    <div className={classes.todoListHeader}>
      <Button clicked={displayAddNewTodoListModal}> Add New Todo List </Button>
      <Button clicked={displayDeleteTodoListModal} isDisabled={isDeleteBtnDisabled}> Delete Todo List </Button>
    </div>
  )
}
export default TodoAppActionBar;

TodoAppActionBar.propTypes = {
  modalDisplayHandler: PropTypes.func.isRequired
}