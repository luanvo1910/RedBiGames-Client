import {useContext, useEffect } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import { AuthContext } from '../../contexts/AuthContext'
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const OrderComfirmModal = () => {
    const {
        showModal,
        setShowModal
    } = useContext(OrderContext)

    const closeDialog = () => {
        setShowModal(false)
	}

  return (
    <Modal show={showModal} onHide={closeDialog}>
        <Modal.Header>
            <Modal.Title>
                <h1>
                    CONFIRM ORDER
                </h1>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Thank you for your purchanse</h1>
            <h3>We have sent an email to your email to confirm your order</h3>
            <p>Your order will be deliveried to you in 1 week</p>
            <p>Please prepare money for the price of the order</p>
        </Modal.Body>
        <Modal.Footer>
            <Link to='/'>
                <Button variant='primary' onClick={closeDialog}>
                    Confirm
                </Button>
            </Link>
        </Modal.Footer>
    </Modal>
  )
}

export default OrderComfirmModal