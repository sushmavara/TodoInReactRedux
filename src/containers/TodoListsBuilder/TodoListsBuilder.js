import React , {Component} from 'react'
import classes from './TodoListsBuilder.module.css'
import TodoLists from '../../components/TodoLists/TodoLists'
import TodoAppActionBar from '../../components/TodoAppActionBar/TodoAppActionBar'
import AddNewTodoListModal from '../../components/TodoListDataModal/AddNewTodoListModal/AddNewTodoListModal'
import DeleteTodoListModal from '../../components/TodoListDataModal/DeleteTodoListModal/DeleteTodoListModal'
import {connect} from 'react-redux'
import * as TodoListActionTypes from '../../store/actionTypes/TodoListActionTypes'

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
    const todoListId=  Date.now().toString();
    this.props.addNewTodoListHandler(title,todoListId);
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
          <TodoLists modalDisplayHandler={this.toggleModalDisplay} />
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
    addNewTodoListHandler: (todoListTitle,todoListId) => dispatch({type:TodoListActionTypes.ADD_NEW_TODO_LIST,title:todoListTitle,todoListId:todoListId}),
    deleteSelectedTodoListHandler : () => dispatch({type:TodoListActionTypes.DELETE_SELECTED_TODO_LIST}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoListsBuilder);
