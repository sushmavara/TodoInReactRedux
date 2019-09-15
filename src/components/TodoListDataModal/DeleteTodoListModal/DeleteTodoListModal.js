import React,{Component} from 'react';
import ModalWrapper from '../../../ui/ModalWrapper/ModalWrapper';
import PropTypes from 'prop-types';
import Button from '../../../ui/Button/Button';
import {SHOW_TODO_LIST_DELETE_MODAL} from '../../../constants/TodoListDataModalConstants';

class DeleteTodoListModal extends Component{

  hideDeleteTodoListModal = () => {
    this.props.modalDisplayHandler(SHOW_TODO_LIST_DELETE_MODAL,false);
  }

  deleteSelectedTodoList = () =>{
    this.props.deleteSelectedTodoList();
    this.hideDeleteTodoListModal();
  }

  render(){
    const modalHeader = <React.Fragment>Delete Todo List</React.Fragment>;
    const modalBody = ( <label>
                          Are you sure you want to delete selected Todo Lists ?!!
                        </label>);
    const modalFooter = <React.Fragment>
                            <Button clicked={this.hideDeleteTodoListModal}>Cancel</Button>
                            <Button clicked={this.deleteSelectedTodoList}>Delete</Button>
                        </React.Fragment>
    return (
      <ModalWrapper modalHeader={modalHeader}
                    modalBody={modalBody} 
                    modalFooter={modalFooter}
                    backDropClickHandler={this.hideDeleteTodoListModal}
                    showBackDrop
    />);
  }
}

DeleteTodoListModal.propTypes ={
  modalDisplayHandler: PropTypes.func.isRequired,
  deleteSelectedTodoList: PropTypes.func.isRequired
}
export default DeleteTodoListModal;