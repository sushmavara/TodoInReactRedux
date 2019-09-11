import React , {Component} from 'react'
import classes from './TodoListsBuilder.module.css'
import TodoLists from '../../components/TodoLists/TodoLists'
import TodoAppActionBar from '../../components/TodoAppActionBar/TodoAppActionBar'
import TodoItemActionsContext from '../../context/TodoItemActionsContext'
import AddNewTodoListModal from '../../components/TodoListDataModal/AddNewTodoListModal/AddNewTodoListModal'
import DeleteTodoListModal from '../../components/TodoListDataModal/DeleteTodoListModal/DeleteTodoListModal'
const _ = require('lodash');


class TodoListsBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [],
      showTodoListAddDataModal: false,
      showTodoListDeleteModal: false,
    }
  }

  toggleModalDisplay = (modalName, modalState) => {
    this.setState({
      [modalName] : modalState
    });
  }

  getTodoListIndex = (listId) =>{
    return _.findIndex(this.state.todoLists,(todoList)=> todoList.listId === listId);
  }

  getTodoItemIndex = (listItems, itemId) =>{
    return _.findIndex(listItems,(todoItem) => todoItem.id === itemId);
  }

  addNewTodoListHandler = (title) => {
    const updatedTodoLists = this.state.todoLists;
    updatedTodoLists.push({
      listId: Date.now().toString(),
      listItems: [],
      listTitle: title,
      isSelected: false
    });
    this.setState({
      todoLists: updatedTodoLists,
      showTodoListAddDataModal: false,
    });
  }

  toggleTodoListCheckedHandler = (listId) => {
    const updatedTodoLists = this.state.todoLists;
    const listIndex = this.getTodoListIndex(listId);
    const todoList = updatedTodoLists[listIndex];
    todoList.isSelected = !todoList.isSelected;
    this.setState({
      todoLists: updatedTodoLists
    });
  }

  deleteSelectedTodoListHandler = () => {
    const updatedTodoLists = this.state.todoLists;
    _.remove(updatedTodoLists,(todoList) => todoList.isSelected);
    this.setState({
      todoLists: updatedTodoLists,
      showTodoListDeleteModal: false,
    });
  }

  addNewTodoItemHandler = (listId, title) => {
    const updatedTodoLists = this.state.todoLists;
    const newTodoItem = { 
      title: title, 
      id:Date.now().toString(), 
      isCompleted:false, 
      isChecked:false
    };
    const listIndex = this.getTodoListIndex(listId);
    updatedTodoLists[listIndex].listItems =[newTodoItem,...updatedTodoLists[listIndex].listItems];
    this.setState({
      todoLists: updatedTodoLists
    })
  }

  markCompleteTodoItemHandler = (listId, itemId, isToggle) => {
    const updatedTodoLists = this.state.todoLists;
    const listIndex = this.getTodoListIndex(listId);
    const todoListItems =  updatedTodoLists[listIndex].listItems;
    const itemIndex = this.getTodoItemIndex(todoListItems,itemId);
    if(isToggle){
      todoListItems[itemIndex].isCompleted = !todoListItems[itemIndex].isCompleted;
    }else{
      todoListItems[itemIndex].isCompleted = true;
    }
    this.setState({
      todoLists: updatedTodoLists
    });
  }

  toggleTodoItemCheckedHandler = (listId, itemId) => {
    const updatedTodoLists = this.state.todoLists;
    const listIndex = this.getTodoListIndex(listId);
    const todoListItems =  updatedTodoLists[listIndex].listItems;
    const itemIndex =this.getTodoItemIndex(todoListItems,itemId);
    todoListItems[itemIndex].isChecked = !todoListItems[itemIndex].isChecked;
    this.setState({
      todoLists: updatedTodoLists
    });
  }

  deleteTodoItemHandler = (listId, itemId) => {
    const updatedTodoLists = this.state.todoLists;
    const listIndex = this.getTodoListIndex(listId);
    const todoListItems =  updatedTodoLists[listIndex].listItems;
    _.remove(todoListItems,(todoItem)=> todoItem.id === itemId);
    this.setState({
      todoLists: updatedTodoLists
    });
  }

  render(){
    const { showTodoListAddDataModal,
            showTodoListDeleteModal} = this.state;
    return(
      <React.Fragment>
        <TodoAppActionBar modalStateHandler={this.toggleModalDisplay} todoListsLength={this.state.todoLists.length} />
        <div className={classes.todoListsContainer}>
          <TodoItemActionsContext.Provider value={{ toggleTodoItemCheckedHandler: this.toggleTodoItemCheckedHandler,
                                                    markCompleteTodoItemHandler: this.markCompleteTodoItemHandler ,
                                                    deleteTodoItemHandler: this.deleteTodoItemHandler ,
                                                    toggleTodoListCheckedHandler : this.toggleTodoListCheckedHandler}}>
            <TodoLists  todoLists={this.state.todoLists}
                        addNewTodoItemHandler= {this.addNewTodoItemHandler}
                        toggleModalDisplay={this.toggleModalDisplay} />
          </TodoItemActionsContext.Provider>
        </div>
        {showTodoListAddDataModal && <AddNewTodoListModal addNewTodoListHandler={this.addNewTodoListHandler} 
                                                          modalStateHandler={this.toggleModalDisplay}/>}
        {showTodoListDeleteModal && <DeleteTodoListModal deleteSelectedTodoListHandler={this.deleteSelectedTodoListHandler} 
                                                         modalStateHandler={this.toggleModalDisplay}/> }
      </React.Fragment>  
    );
  }
}

export default TodoListsBuilder;
