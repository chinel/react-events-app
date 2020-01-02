import React, {Component} from 'react';
import {Modal, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {closeModal, openModal} from "./modalActions";

const actions = {closeModal, openModal};

class UnauthModal extends Component {
    render() {
        const {openModal, closeModal} = this.props;
        return (
            <Modal
                size='mini'
                open={true}
                onClose={closeModal}
            >
                <Modal.Header>
                    You need to be signed in to do that!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Please either login or register to see this page</p>
                        <Button.Group widths={4}>
                            <Button fluid color='teal' onClick={() => openModal("LoginModal")}>Login</Button>
                            <Button.Or />
                            <Button fluid positive onClick={() => openModal("RegisterModal")}>Register</Button>
                        </Button.Group>
                        <Divider/>
                        <div style={{textAlign: 'center'}}>
                            <p>Or click cancel to continue as a guest</p>
                            <Button onClick={closeModal}>Cancel</Button>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(UnauthModal);