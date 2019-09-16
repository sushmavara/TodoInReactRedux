import * as TodoListActionTypes from '../actionTypes/todoListActionTypes';

const addNewTodoList = (todoListTitle,todoListId) =>{
  return {
    type:TodoListActionTypes.ADD_NEW_TODO_LIST,
    title:todoListTitle,
    todoListId:todoListId
  }
}

const deleteSelectedTodoList = () =>{
  return {
    type:TodoListActionTypes.DELETE_SELECTED_TODO_LIST
  }
}

const toggleTodoListIsChecked = (listId) =>{
  return {
    type:TodoListActionTypes.TOGGLE_TODO_LIST_IS_CHECKED,listId:listId
  }
}

export {
  addNewTodoList,
  deleteSelectedTodoList,
  toggleTodoListIsChecked
}