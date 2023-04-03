import {useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import { AuthContext } from '../../contexts/AuthContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const OrderComfirmModal = () => {
    let history = useHistory();

    const {
        showModal,
        setShowModal
    } = useContext(OrderContext)

    const {
		authState: {
			user
		}
	} = useContext(AuthContext)

    const closeDialog = () => {
        setShowModal(false)
        history.push("/")
	}

  return (
    <Modal show={showModal} onHide={closeDialog}>
        <Modal.Header style={{ textAlign: 'center' }}>
            <Modal.Title>
                <h1>
                    CONFIRM ORDER {user.username.toUpperCase()}
                </h1>
                <h4>
                    Thank you for your purchanse
                </h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please check invoice we have been sent to your email</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' onClick={closeDialog}>
                Confirm
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default OrderComfirmModal