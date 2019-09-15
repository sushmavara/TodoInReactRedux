
import React,{Component} from 'react';
import classes from './TodoListActions.module.css';
import Button from '../../../../ui/Button/Button';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

class TodoListActions extends Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
    }
    this.todoInputBtnRef = React.createRef();
  }

  inputValueHandler = (event) =>{
    this.setState({
      inputValue : event.target.value
    });
  }

  addNewTodoItemOnEnter = (event) =>{
    if(event.which===13){
      this.props.handleAddNewTodoItem(this.state.inputValue);
      this.setState({
        inputValue : ""
      }); 
    }
  }

  addNewTodoItemHandler = () =>{
    this.props.handleAddNewTodoItem(this.state.inputValue.trim());
    this.setState({
      inputValue : ""
    });
    this.todoInputBtnRef.current.focus();
  }

  render(){
    let isButtonDisabled = this.state.inputValue.trim() === "";
    return(
      <React.Fragment>
      <div>
        <input placeholder="Add Your Todo Task" value={this.state.inputValue}
               onChange={this.inputValueHandler} onKeyPress={this.addNewTodoItemOnEnter}
               ref= {this.todoInputBtnRef}
               />
        <Button classNames={classes.addTodoTaskBtn} 
                clicked={this.addNewTodoItemHandler} isDisabled={isButtonDisabled}>
                    Add Todo
        </Button>
      </div>
      <div className={classes.todoListActionBar}>
        <Button clicked={this.props.deleteSelectedTodos}>
            Delete Todo
        </Button>
        <Button clicked={this.props.marCompleteSelectedTodos}>
            Mark Complete
        </Button>  
      </div>
    </React.Fragment> 
    )
  }
}

TodoListActions.propTypes ={
  handleAddNewTodoItemOnEnter: PropTypes.func,
  handleAddNewTodoItem: PropTypes.func,
  deleteSelectedTodos : PropTypes.func,
  marCompleteSelectedTodos: PropTypes.func
}

TodoListActions.defaultProps = {
  handleAddNewTodoItemOnEnter: noop,
  handleAddNewTodoItem : noop,
  deleteSelectedTodos : noop,
  marCompleteSelectedTodos: noop
}



export default TodoListActions;














