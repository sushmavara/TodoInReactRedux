import React,{Component} from 'react'
import classes from './TodoList.module.css';
import TodoItem from './TodoItem/TodoItem'
import PropTypes from 'prop-types';
import TodoListHeader from './TodoListHeader/TodoListHeader'
import TodoListActions from './TodoListActions/TodoListActions'
import { noop } from '@babel/types';
import TodoItemActionsContext from '../../../context/TodoItemActionsContext'
const _ = require('lodash');

class TodoList extends Component{

  static contextType = TodoItemActionsContext;

  getCheckedTodoItems = () => {
    let todoItemList= this.props.todoListInfo.listItems;
    return _.filter(todoItemList,(item) => item.isChecked);
  }

  deleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.context.deleteTodoItemHandler(this.props.todoListId, todoItem.id);
    });
  }

  marCompleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.context.markCompleteTodoItemHandler(this.props.todoListId, todoItem.id ,false);
    });
  }

  handleAddNewTodoItem = (todoItemTitle) => {
   if(todoItemTitle.trim() !== ""){
    this.props.addNewTodoItemHandler(this.props.todoListId, todoItemTitle);
   }
  }

  todoListCheckHandler = () => {
    this.context.toggleTodoListCheckedHandler(this.props.todoListId);
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
  markCompleteSelectedTodoItemHandler: PropTypes.func,
  addNewTodoItemHandler: PropTypes.func,
}

TodoList.defaultProps = {
  markCompleteSelectedTodoItemHandler : noop,
  addNewTodoItemHandler : noop,
}



export default TodoList;