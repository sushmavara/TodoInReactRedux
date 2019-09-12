import React, {Component} from 'react'
import TodoList from './TodoList/TodoList'
import classes from './TodoLists.module.css'
import PropTypes from 'prop-types'
import {SHOW_TODO_LIST_ADD_DATA_MODAL} from '../../constants/TodoListDataModalConstants'
import Button from '../../ui/Button/Button'
import addIcon from '../../assets/add_todo_list.png'
import { noop } from '@babel/types'
import {connect} from 'react-redux'
const _ = require('lodash');

class TodoLists extends Component {

  showAddTodoListModal = () =>{
    this.props.modalDisplayHandler(SHOW_TODO_LIST_ADD_DATA_MODAL,true);
  }

  render (){
    let todoListsContainer = "";
    let {todoLists} = this.props;
    let addListButton = null;
    if(!(_.isEmpty(todoLists))){
      addListButton = (
        <div>
          <Button classNames = {classes.addIcon} clicked={this.showAddTodoListModal}>
            <img src = {addIcon} alt = "add todo list"></img>
          </Button>
        </div>
      );
    }
    if(_.isEmpty(todoLists)){
      todoListsContainer = (<p className={classes.emptyTodoContainer}>No Todo Lists To display</p>);
    } else {
        todoListsContainer = _.map(todoLists,(todoList) => {
          return (
              <TodoList  key={todoList.listId} 
                         todoListInfo ={todoList}
                         todoListId={todoList.listId}
                         />
          )
        });
      }
    return (
      <React.Fragment>
        {todoListsContainer}
        {addListButton}
      </React.Fragment>
    );
  }  
}

TodoLists.propTypes ={
  todoLists: PropTypes.arrayOf(PropTypes.object),
  modalDisplayHandler: PropTypes.func
}

TodoLists.defaultProps ={
  todoLists: [],
  modalDisplayHandler : noop
}

const mapStateToProps = state =>{
  return {
    todoLists : state.todoListsContainer
  }
}

export default connect(mapStateToProps)(TodoLists);