import * as TodoListActionTypes from '../actionTypes/TodoListActionTypes'
import * as TodoItemActionTypes from '../actionTypes/TodoItemActionTypes'

const _ = require('lodash');

const initialState = {
  todoListsContainer:[]
}

const TodoListReducer = (state = initialState, action) =>{

  const getTodoListIndex = (todoListsArray,listId) =>{
    return _.findIndex(todoListsArray,(todoList)=> todoList.listId === listId);
  }

  const getTodoItemIndex = (listItems, itemId) =>{
    return _.findIndex(listItems,(todoItem) => todoItem.id === itemId);
  }

  const addNewTodoList = (title) => {
    const updatedTodoLists = [...state.todoListsContainer];
    updatedTodoLists.push({
      listId: Date.now().toString(),
      listItems: [],
      listTitle: title,
      isSelected: false
    });
    return {
      ...state,
      todoListsContainer:updatedTodoLists
    };
  }

  const deleteSelectedTodoList= () => {
    const updatedTodoLists = [...state.todoListsContainer];
    _.remove(updatedTodoLists,(todoList) => todoList.isSelected);
    return {
      ...state,
      todoListsContainer:updatedTodoLists
    };
  }

  const toggleIsCheckedOnTodoList = (listId) => {
    const updatedTodoLists = [...state.todoListsContainer];
    const listIndex = getTodoListIndex(updatedTodoLists,listId);
    const todoList = updatedTodoLists[listIndex];
    todoList.isSelected = !todoList.isSelected;
    return{
      ...state,
      todoListsContainer:updatedTodoLists
    }
  }

  const addNewTodoItem= (listId, todoTitle) => {
    const updatedTodoLists = [...state.todoListsContainer];
    const newTodoItem = { 
      title: todoTitle, 
      id:Date.now().toString(), 
      isCompleted:false, 
      isChecked:false
    };
    const listIndex = getTodoListIndex(updatedTodoLists,listId);
    updatedTodoLists[listIndex].listItems = [newTodoItem,...updatedTodoLists[listIndex].listItems];
    return{
      ...state,
      todoListsContainer : updatedTodoLists
    }
  }

  const markCompleteTodoItem = (listId, itemId, isToggle) => {
    const updatedTodoLists = [...state.todoListsContainer];
    const listIndex = getTodoListIndex(updatedTodoLists,listId);
    const todoListItems =  updatedTodoLists[listIndex].listItems;
    const itemIndex = getTodoItemIndex(todoListItems,itemId);
    if(isToggle){
      todoListItems[itemIndex].isCompleted = !todoListItems[itemIndex].isCompleted;
    }else{
      todoListItems[itemIndex].isCompleted = true;
    }
    return{
      ...state,
      todoListsContainer : updatedTodoLists
    }
  }

  const toggleIsCheckedOnTodoItem = (listId, itemId) => {
    const updatedTodoLists = [...state.todoListsContainer];
    const listIndex = getTodoListIndex(updatedTodoLists,listId);
    const todoListItems = updatedTodoLists[listIndex].listItems;
    const itemIndex = getTodoItemIndex(todoListItems,itemId);
    todoListItems[itemIndex].isChecked = !todoListItems[itemIndex].isChecked;
    return{
      ...state,
      todoListsContainer : updatedTodoLists
    }
  }

  const deleteTodoItem = (listId, itemId) => {
    const updatedTodoLists = [...state.todoListsContainer];
    const listIndex = getTodoListIndex(updatedTodoLists,listId);
    const todoListItems =  updatedTodoLists[listIndex].listItems;
    _.remove(todoListItems,(todoItem)=> todoItem.id === itemId);
    return{
      ...state,
      todoListsContainer : updatedTodoLists
    }
  }

  switch(action.type){
    case TodoListActionTypes.ADD_NEW_TODO_LIST : 
      return addNewTodoList(action.title);
    case TodoListActionTypes.DELETE_SELECTED_TODO_LIST:
      return deleteSelectedTodoList();
    case TodoListActionTypes.TOGGLE_TODO_LIST_IS_CHECKED:
      return toggleIsCheckedOnTodoList(action.listId);
    case TodoItemActionTypes.ADD_NEW_TODO_ITEM:
      return addNewTodoItem(action.listId,action.todoTitle);
    case TodoItemActionTypes.MARK_COMPLETE_TODO_ITEM:
      return markCompleteTodoItem(action.listId,action.itemId,action.isToggle);
    case TodoItemActionTypes.TOGGLE_TODO_ITEM_IS_CHECKED:
      return toggleIsCheckedOnTodoItem(action.listId,action.itemId);
    case TodoItemActionTypes.DELETE_TODO_ITEM:
      return deleteTodoItem(action.listId,action.itemId);
    default: return state;
  }
}


export default TodoListReducer;