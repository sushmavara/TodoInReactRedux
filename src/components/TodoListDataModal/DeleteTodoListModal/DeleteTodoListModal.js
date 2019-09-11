import React,{Component} from 'react'
import ModalWrapper from '../../../ui/ModalWrapper/ModalWrapper'
import PropTypes from 'prop-types';
import Button from '../../../ui/Button/Button'
import {SHOW_TODO_LIST_DELETE_MODAL} from '../../../constants/TodoListDataModalConstants'

class DeleteTodoListModal extends Component{

  hideDeleteTodoListModal = () => {
    this.props.modalStateHandler(SHOW_TODO_LIST_DELETE_MODAL,false);
  }

  render(){
    const modalHeader = <React.Fragment>Delete Todo List</React.Fragment>;
    const modalBody = ( <label>
                          Are you sure you want to delete selected Todo Lists ?!!
                        </label>);
    const modalFooter = <React.Fragment>
                            <Button clicked={this.hideDeleteTodoListModal}>Cancel</Button>
                            <Button clicked={this.props.deleteSelectedTodoListHandler}>Delete</Button>
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
  modalStateHandler: PropTypes.func.isRequired,
  deleteSelectedTodoListHandler: PropTypes.func.isRequired
}
export default DeleteTodoListModal;