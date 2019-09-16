import React,{Component} from 'react';
import classes from './TodoList.module.css';
import TodoItem from './TodoItem/TodoItem';
import PropTypes from 'prop-types';
import TodoListHeader from './TodoListHeader/TodoListHeader';
import TodoListActions from './TodoListActions/TodoListActions';
import {noop} from 'lodash';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actionCreators/index'
const _ = require('lodash');

class TodoList extends Component{

  getCheckedTodoItems = () => {
    let todoItemList= this.props.todoListInfo.listItems;
    return _.filter(todoItemList,(item) => item.isChecked);
  }

  deleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.props.onDeleteTodoItem(this.props.todoListId, todoItem.id);
    });
  }

  marCompleteSelectedTodos = () => {
    const checkedTodos = this.getCheckedTodoItems();
    _.forEach(checkedTodos,(todoItem)=>{
      this.props.onMarkCompleteTodoItem(this.props.todoListId, todoItem.id ,false);
    });
  }

  handleAddNewTodoItem = (todoItemTitle) => {
   if(todoItemTitle.trim() !== ""){
    const todoItemId= Date.now().toString();
    this.props.onAddNewTodoItem(this.props.todoListId, todoItemTitle,todoItemId);
   }
  }

  todoListCheckHandler = () => {
    this.props.onToggleIsCheckedTodoList(this.props.todoListId);
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
    onToggleIsCheckedTodoList : (listId) => dispatch(actions.toggleTodoListIsChecked(listId)),
    onAddNewTodoItem : (listId,todoTitle,itemId) => dispatch(actions.addNewTodoItem(listId,todoTitle,itemId)),
    onMarkCompleteTodoItem : (listId,itemId,isToggle) => dispatch(actions.markCompleteTodoItem(listId,itemId,isToggle)),
    onDeleteTodoItem: (listId,itemId) => dispatch(actions.deleteTodoItem(listId,itemId)),
  }
}



export default connect(null,mapDispatchToProps)(TodoList);