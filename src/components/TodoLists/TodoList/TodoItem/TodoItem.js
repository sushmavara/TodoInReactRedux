import React,{Component} from 'react';
import classes from './TodoItem.module.css';
import DeleteTodo from '../../../../assets/todo-delete.png';
import CompleteTodo from '../../../../assets/todo-complete.png';
import PropTypes from 'prop-types';
import Button from '../../../../ui/Button/Button';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../store/actionCreators/index';
const _ = require('lodash');

class TodoItem extends Component{

  updateTodoItemCheckStatus = () =>{
    this.props.toggleIsCheckedTodoItem(this.props.todoListId,this.props.todoItemId)
  }

  updateTodoItemMarkCompleteStatus = () =>{
    this.props.markCompleteTodoItem(this.props.todoListId,this.props.todoItemId,true);
  }

  deleteTodoItemHandler = () =>{
    this.props.deleteTodoItem(this.props.todoListId,this.props.todoItemId)
  }

  render () {
    let titleClassName= this.props.todoCompleted ?_.join([classes.todoTitle ,classes.markComplete],' '): classes.todoTitle;
    return (
      <li className={classes.todoTask}>
        <input type="checkbox" name="todoSelect" onChange={this.updateTodoItemCheckStatus}/>
        <div className={titleClassName}>
          {this.props.todoTitle}
        </div>      
        <div> 
          <Button clicked={this.updateTodoItemMarkCompleteStatus}>
            <img src={CompleteTodo} alt="mark complete todo"/>
          </Button>
          <Button clicked={this.deleteTodoItemHandler}>
            <img src={DeleteTodo} alt="delete todo"/>
          </Button>  
        </div>            
      </li>
    );
  }
}


TodoItem.propTypes ={
  todoTitle: PropTypes.string.isRequired,
  todoCompleted: PropTypes.bool,
  todoItemId: PropTypes.string.isRequired,
  todoListId: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  todoCompleted: false
}

const mapDispatchToProps = dispatch =>{
  return{
    markCompleteTodoItem : (listId,itemId,isToggle) => dispatch(actionCreators.markCompleteTodoItem(listId,itemId,isToggle)),
    deleteTodoItem: (listId,itemId) => dispatch(actionCreators.deleteTodoItem(listId,itemId)),
    toggleIsCheckedTodoItem : (listId,itemId) => dispatch(actionCreators.toggleIsCheckedTodoItem(listId,itemId))
  }
}


export default connect(null,mapDispatchToProps)(TodoItem);