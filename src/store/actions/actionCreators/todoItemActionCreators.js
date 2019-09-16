import * as TodoItemActionTypes from '../actionTypes/todoItemActionTypes';

const addNewTodoItem = (listId,todoTitle,itemId) =>{
  return {
    type:TodoItemActionTypes.ADD_NEW_TODO_ITEM,
    listId:listId,
    todoTitle:todoTitle,
    itemId:itemId
  }
}

const markCompleteTodoItem = (listId,itemId,isToggle) =>{
  return {
    type:TodoItemActionTypes.MARK_COMPLETE_TODO_ITEM,
    listId:listId,
    itemId:itemId,
    isToggle:isToggle
  }
}

const deleteTodoItem = (listId,itemId) =>{
  return {
    type:TodoItemActionTypes.DELETE_TODO_ITEM,
    listId:listId,
    itemId:itemId
  }
}

const toggleIsCheckedTodoItem = (listId,itemId) =>{
  return {
    type:TodoItemActionTypes.TOGGLE_TODO_ITEM_IS_CHECKED,
    listId:listId,
    itemId:itemId
  }
}

export {
  addNewTodoItem,
  markCompleteTodoItem,
  deleteTodoItem,
  toggleIsCheckedTodoItem
}