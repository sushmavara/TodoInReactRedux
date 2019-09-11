import React,{Component} from 'react'
import classes from './TodoItem.module.css';
import DeleteTodo from '../../../../assets/todo-delete.png'
import CompleteTodo from '../../../../assets/todo-complete.png'
import TodoItemActionsContext from '../../../../context/TodoItemActionsContext'
import PropTypes from 'prop-types';
import Button from '../../../../ui/Button/Button';
const _ = require('lodash');

class TodoItem extends Component{
  static contextType = TodoItemActionsContext;

  updateTodoItemCheckStatus = () =>{
    this.context.toggleIsCheckedTodoItem(this.props.todoListId,this.props.todoItemId)
  }

  updateTodoItemMarkCompleteStatus = () =>{
    this.context.markCompleteTodoItem(this.props.todoListId,this.props.todoItemId,true);
  }

  deleteTodoItem = () =>{
    this.context.deleteTodoItem(this.props.todoListId,this.props.todoItemId)
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
          <Button clicked={this.deleteTodoItem}>
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

export default TodoItem;