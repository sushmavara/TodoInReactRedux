import React , {Component} from 'react'
import classes from './TodoListsBuilder.module.css'
import TodoLists from '../../components/TodoLists/TodoLists'
import TodoAppActionBar from '../../components/TodoAppActionBar/TodoAppActionBar'
import TodoItemActionsContext from '../../context/TodoItemActionsContext'
import AddNewTodoListModal from '../../components/TodoListDataModal/AddNewTodoListModal/AddNewTodoListModal'
import DeleteTodoListModal from '../../components/TodoListDataModal/DeleteTodoListModal/DeleteTodoListModal'
import {connect} from 'react-redux'
import * as TodoListActionTypes from '../../store/actionTypes/TodoListActionTypes'
import * as TodoItemActionTypes from '../../store/actionTypes/TodoItemActionTypes'


class TodoListsBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTodoListAddDataModal: false,
      showTodoListDeleteModal: false,
    }
  }

  toggleModalDisplay = (modalName, modalState) => {
    this.setState({
      [modalName] : modalState
    });
  }

  addNewTodoList = (title) =>{
    this.props.addNewTodoListHandler(title);
    this.setState({
      showTodoListAddDataModal:false
    })
  }

  deleteSelectedTodoList = () =>{
    this.props.deleteSelectedTodoListHandler();
    this.setState({
      showTodoListDeleteModal:false
    })
  }

  render(){
    const { showTodoListAddDataModal,
            showTodoListDeleteModal} = this.state;
    return(
      <React.Fragment>
        <TodoAppActionBar modalDisplayHandler={this.toggleModalDisplay} todoListsLength={this.props.todoLists.length} />
        <div className={classes.todoListsContainer}>
          <TodoItemActionsContext.Provider value={{ toggleIsCheckedTodoItem: this.props.toggleIsCheckedTodoItemHandler,
                                                    markCompleteTodoItem: this.props.markCompleteTodoItemHandler ,
                                                    deleteTodoItem: this.props.deleteTodoItemHandler ,
                                                    toggleIsCheckedTodoList : this.props.toggleIsCheckedTodoListHandler}}>
            <TodoLists  todoLists={this.props.todoLists}
                        addNewTodoItem= {this.props.addNewTodoItemHandler}
                        modalDisplayHandler={this.toggleModalDisplay} />
          </TodoItemActionsContext.Provider>
        </div>
        {showTodoListAddDataModal && <AddNewTodoListModal addNewTodoList={this.addNewTodoList} 
                                                          modalDisplayHandler={this.toggleModalDisplay}/>}
        {showTodoListDeleteModal && <DeleteTodoListModal deleteSelectedTodoList={this.deleteSelectedTodoList} 
                                                         modalDisplayHandler={this.toggleModalDisplay}/> }
      </React.Fragment>  
    );
  }
}

const mapStateToProps = state =>{
  return {
    todoLists : state.todoListsContainer
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addNewTodoListHandler: (todoListTitle) => dispatch({type:TodoListActionTypes.ADD_NEW_TODO_LIST,title:todoListTitle}),
    deleteSelectedTodoListHandler : () => dispatch({type:TodoListActionTypes.DELETE_SELECTED_TODO_LIST}),
    toggleIsCheckedTodoListHandler : (listId) => dispatch({type:TodoListActionTypes.TOGGLE_TODO_LIST_IS_CHECKED,listId:listId}),
    addNewTodoItemHandler : (listId,todoTitle) => dispatch({type:TodoItemActionTypes.ADD_NEW_TODO_ITEM,listId:listId,todoTitle:todoTitle}),
    markCompleteTodoItemHandler : (listId,itemId,isToggle) => dispatch({type:TodoItemActionTypes.MARK_COMPLETE_TODO_ITEM,listId:listId,itemId:itemId,isToggle:isToggle}),
    deleteTodoItemHandler: (listId,itemId) => dispatch({type:TodoItemActionTypes.DELETE_TODO_ITEM,listId:listId,itemId:itemId}),
    toggleIsCheckedTodoItemHandler : (listId,itemId) => dispatch({type:TodoItemActionTypes.TOGGLE_TODO_ITEM_IS_CHECKED,listId:listId,itemId:itemId})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoListsBuilder);
