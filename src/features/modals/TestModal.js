import React from 'react'
import {Modal} from 'semantic-ui-react';

const TestModal = () => {
    return (
           <Modal closeIcon="close" open={true}>
             <Modal.Header>Test Modal</Modal.Header>
             <Modal.Content>
               <Modal.Description>
                 <p>Test Modal... nothing to see here</p>
               </Modal.Description>
             </Modal.Content>
           </Modal>
    )
}

export default TestModal
