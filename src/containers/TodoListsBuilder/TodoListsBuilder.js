import React , {Component} from 'react';
import TodoLists from '../../components/TodoLists/TodoLists';
import TodoAppActionBar from '../../components/TodoAppActionBar/TodoAppActionBar';
import AddNewTodoListModal from '../../components/TodoListDataModal/AddNewTodoListModal/AddNewTodoListModal';
import DeleteTodoListModal from '../../components/TodoListDataModal/DeleteTodoListModal/DeleteTodoListModal';
import * as actionCreators from '../../store/actionCreators/index';
import {connect} from 'react-redux';

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
        <TodoLists modalDisplayHandler={this.toggleModalDisplay} todoLists={{checck:"hellooow"}}/>
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
    addNewTodoListHandler: (todoListTitle,todoListId) => dispatch(actionCreators.addNewTodoList(todoListTitle,todoListId)),
    deleteSelectedTodoListHandler : () => dispatch(actionCreators.deleteSelectedTodoList()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoListsBuilder);
