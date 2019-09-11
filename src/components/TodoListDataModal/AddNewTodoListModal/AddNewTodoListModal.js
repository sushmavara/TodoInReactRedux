import React,{Component} from 'react'
import ModalWrapper from '../../../ui/ModalWrapper/ModalWrapper';
import PropTypes from 'prop-types';
import Button from '../../../ui/Button/Button'
import {SHOW_TODO_LIST_ADD_DATA_MODAL} from '../../../constants/TodoListDataModalConstants'

class AddNewTodoListModal extends Component {
  constructor(props){
    super(props);
    this.state={
      todoListTitleInputValue:""
    }
    this.listTitleInputRef = React.createRef();
  }

  componentDidMount(){
    this.listTitleInputRef.current.focus();
  }

  addNewTodoItemOnEnter = (event) =>{
    if (event.which === 13) {
      this.validateAndAddNewList();
    }
  }

  validateAndAddNewList = () => {
    if(this.state.todoListTitleInputValue.trim() !== ""){
      this.props.addNewTodoList(this.state.todoListTitleInputValue.trim());
    }
  }

  handleInputValue = (event) =>{
    this.setState({
      todoListTitleInputValue:event.target.value
    })
  }

  hideAddNewTodoListModal = () => {
    this.props.modalDisplayHandler(SHOW_TODO_LIST_ADD_DATA_MODAL,false);
  }

  render(){
    const isAddBtnDisabled = this.state.todoListTitleInputValue.trim() === "";
    const modalHeader = "Add New Todo List";
    const modalBody = (<React.Fragment>
                          <div>
                            <label>Enter Title For New Todo List</label>
                          </div>
                          <div>
                            <input  type="text" ref={this.listTitleInputRef}
                                    onKeyPress={this.addNewTodoItemOnEnter}
                                    onChange ={this.handleInputValue}
                                   />
                          </div>
                          <span ref={this.titleErrorRef}>
                            Title can not be empty
                          </span>
                        </React.Fragment>);
    const modalFooter = <React.Fragment>
                            <Button clicked={this.hideAddNewTodoListModal}>Cancel</Button>
                            <Button clicked={this.validateAndAddNewList} isDisabled={isAddBtnDisabled}>Add</Button>
                        </React.Fragment>
    return (
        <ModalWrapper modalHeader={modalHeader}
                      modalBody={modalBody} 
                      modalFooter={modalFooter}
                      backDropClickHandler={this.hideAddNewTodoListModal}
                      showBackDrop 
                />
    );
  } 
}

AddNewTodoListModal.propTypes ={
  modalDisplayHandler: PropTypes.func.isRequired,
  addNewTodoList: PropTypes.func.isRequired
}


export default AddNewTodoListModal;