import * as TodoListActionTypes from '../actionTypes/todoListActionTypes';
import * as TodoItemActionTypes from '../actionTypes/todoItemActionTypes';
import updateObj from '../utility';

const _ = require('lodash');

const initialState = {
  todoListsContainer:[]
}

const getTodoListIndex = (todoListsArray,listId) =>{
  return _.findIndex(todoListsArray,(todoList)=> todoList.listId === listId);
}

const getTodoItemIndex = (listItems, itemId) =>{
  return _.findIndex(listItems,(todoItem) => todoItem.id === itemId);
}

const addNewTodoList = (title,todoListId,state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  updatedTodoLists.push({
    listId: todoListId,
    listItems: [],
    listTitle: title,
    isSelected: false
  });
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const deleteSelectedTodoList= (state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  _.remove(updatedTodoLists,(todoList) => todoList.isSelected);
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const toggleIsCheckedOnTodoList = (listId,state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  const listIndex = getTodoListIndex(updatedTodoLists,listId);
  const todoList = updatedTodoLists[listIndex];
  todoList.isSelected = !todoList.isSelected;
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const addNewTodoItem= (listId,todoTitle,itemId,state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  const newTodoItem = { 
    title: todoTitle, 
    id:itemId, 
    isCompleted:false, 
    isChecked:false
  };
  const listIndex = getTodoListIndex(updatedTodoLists,listId);
  updatedTodoLists[listIndex].listItems = [newTodoItem,...updatedTodoLists[listIndex].listItems];
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const markCompleteTodoItem = (listId, itemId, isToggle, state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  const listIndex = getTodoListIndex(updatedTodoLists,listId);
  const todoListItems =  updatedTodoLists[listIndex].listItems;
  const itemIndex = getTodoItemIndex(todoListItems,itemId);
  if(isToggle){
    todoListItems[itemIndex].isCompleted = !todoListItems[itemIndex].isCompleted;
  }else{
    todoListItems[itemIndex].isCompleted = true;
  }
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const toggleIsCheckedOnTodoItem = (listId, itemId, state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  const listIndex = getTodoListIndex(updatedTodoLists,listId);
  const todoListItems = updatedTodoLists[listIndex].listItems;
  const itemIndex = getTodoItemIndex(todoListItems,itemId);
  todoListItems[itemIndex].isChecked = !todoListItems[itemIndex].isChecked;
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const deleteTodoItem = (listId, itemId, state) => {
  const updatedTodoLists = _.cloneDeep(state.todoListsContainer);
  const listIndex = getTodoListIndex(updatedTodoLists,listId);
  const todoListItems =  updatedTodoLists[listIndex].listItems;
  _.remove(todoListItems,(todoItem)=> todoItem.id === itemId);
  return updateObj(state,{todoListsContainer:updatedTodoLists});
}

const todoListReducer = (state = initialState, action) =>{
  switch(action.type){
    case TodoListActionTypes.ADD_NEW_TODO_LIST : 
      return addNewTodoList(action.title, action.todoListId, state);
    case TodoListActionTypes.DELETE_SELECTED_TODO_LIST:
      return deleteSelectedTodoList(state);
    case TodoListActionTypes.TOGGLE_TODO_LIST_IS_CHECKED:
      return toggleIsCheckedOnTodoList(action.listId, state);
    case TodoItemActionTypes.ADD_NEW_TODO_ITEM:
      return addNewTodoItem(action.listId, action.todoTitle, action.itemId,state);
    case TodoItemActionTypes.MARK_COMPLETE_TODO_ITEM:
      return markCompleteTodoItem(action.listId, action.itemId, action.isToggle, state);
    case TodoItemActionTypes.TOGGLE_TODO_ITEM_IS_CHECKED:
      return toggleIsCheckedOnTodoItem(action.listId, action.itemId,state);
    case TodoItemActionTypes.DELETE_TODO_ITEM:
      return deleteTodoItem(action.listId, action.itemId, state);
    default: return state;
  }
}

export default todoListReducer;