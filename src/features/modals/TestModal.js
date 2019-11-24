import React from 'react'
import { connect } from 'react-redux';
import {Modal} from 'semantic-ui-react';
import { closeModal } from './modalActions';

const actions = {
  closeModal
}

const TestModal = ({closeModal}) => {  //Here we are bringing in the closeModal into the props for this component from the modalActions
    return (
           <Modal closeIcon="close" open={true} onClose={closeModal}>
             <Modal.Header>Test Modal</Modal.Header>
             <Modal.Content>
               <Modal.Description>
                 <p>Test Modal... nothing to see here</p>
               </Modal.Description>
             </Modal.Content>
           </Modal>
    )
}

export default connect(null, actions)(TestModal);  //Note that the connect function first parameter is always the state from the store and if we won;t be using it we can set it to null
