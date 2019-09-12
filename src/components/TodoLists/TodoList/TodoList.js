import React,{Component} from 'react'
import classes from './TodoList.module.css';
import TodoItem from './TodoItem/TodoItem'
import PropTypes from 'prop-types';
import TodoListHeader from './TodoListHeader/TodoListHeader'
import TodoListActions from './TodoListActions/TodoListActions'
import { noop } from '@babel/types';
import * as TodoItemActionTypes from '../../../store/actionTypes/TodoItemActionTypes'
import * as TodoListActionTypes from '../../../store/actionTypes/TodoListActionTypes'
import {connect} from 'react-redux'
const _ = require('lodash');

class TodoList extends Component{
  // componentWillReceiveProps(nextProps) {
  //   const {todoListInfo} =this.props;
  //   const {listItems,listTitle} = todoListInfo;

  //   let {todoListInfo: nextListInfo} =nextProps;
  //   let {listItems: nextListItems} = todoListInfo;

  //   console.log(listItems === nextListItems);
  // }

  getCheckedTodoItems = () => {
    let todoItemList= this.props.todoListInfo.listItems;
    return _.filter(todoItemList,(item) => item.isChecked);
  }

  deleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.props.deleteTodoItem(this.props.todoListId, todoItem.id);
    });
  }

  marCompleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.props.markCompleteTodoItem(this.props.todoListId, todoItem.id ,false);
    });
  }

  handleAddNewTodoItem = (todoItemTitle) => {
    debugger;
   if(todoItemTitle.trim() !== ""){
    const todoItemId= Date.now().toString();
    this.props.addNewTodoItem(this.props.todoListId, todoItemTitle,todoItemId);
   }
  }

  todoListCheckHandler = () => {
    this.props.toggleIsCheckedTodoList(this.props.todoListId);
  }

  render(){
    let {todoListInfo} =this.props;
    let {listItems,listTitle} = todoListInfo;

    let todoItemList = <div className={classes.emptyTodoList}>Empty Todo list</div>;
    if(!(_.isEmpty(listItems))){
      todoItemList = _.map(listItems,(todoItem) =>{
        return (
          <TodoItem key = {todoItem.id} 
                    todoTitle = {todoItem.title} 
                    todoCompleted = {todoItem.isCompleted}
                    todoItemId = {todoItem.id}
                    todoListId = {this.props.todoListId} />
          )
      });
    }
    return(
      <div className={classes.todoListWrapper}>
        <TodoListHeader todoListTitle={listTitle}
                        todoListCheckHandler={this.todoListCheckHandler}/>
        <TodoListActions handleAddNewTodoItem = {this.handleAddNewTodoItem}
                         deleteSelectedTodos = {this.deleteSelectedTodos}
                         marCompleteSelectedTodos = {this.marCompleteSelectedTodos}
        />
        <div className={classes.todoList}>
          {todoItemList}
        </div> 
      </div>
    );
  }
}

TodoList.propTypes ={
  todoListInfo: PropTypes.object.isRequired,
  todoListId: PropTypes.string.isRequired,
  markCompleteSelectedTodoItem: PropTypes.func,
  addNewTodoItem: PropTypes.func,
}

TodoList.defaultProps = {
  markCompleteSelectedTodoItem : noop,
  addNewTodoItem : noop,
}

const mapDispatchToProps = dispatch =>{
  return{
    toggleIsCheckedTodoList : (listId) => dispatch({type:TodoListActionTypes.TOGGLE_TODO_LIST_IS_CHECKED,listId:listId}),
    addNewTodoItem : (listId,todoTitle,itemId) => dispatch({type:TodoItemActionTypes.ADD_NEW_TODO_ITEM,listId:listId,todoTitle:todoTitle,itemId:itemId}),
    markCompleteTodoItem : (listId,itemId,isToggle) => dispatch({type:TodoItemActionTypes.MARK_COMPLETE_TODO_ITEM,listId:listId,itemId:itemId,isToggle:isToggle}),
    deleteTodoItem: (listId,itemId) => dispatch({type:TodoItemActionTypes.DELETE_TODO_ITEM,listId:listId,itemId:itemId}),
  }
}



export default connect(null,mapDispatchToProps)(TodoList);