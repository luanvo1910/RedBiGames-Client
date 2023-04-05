import {useContext, useEffect, useState} from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import SingleProduct from './ProductInOrder'
import Moment from 'react-moment'

const ProductDetailsModal = () => {
    const {
        orderState: {order},
        showModal,
        setShowModal
    } = useContext(OrderContext)

    const [showOrder, setShowOrder] = useState(order)
    useEffect(() => setShowOrder(order), [order])
    const { userId, products, createAt, total, email, address } = showOrder

    const closeDialog = () => {
        setShowModal(false)
	}

    return (
        <Modal show={showModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    <h1>
                        {userId.username}'s Order
                    </h1>
                    <h5>Email: {email}</h5>
                    <h5>Address: {address}</h5>
                    <h5>
                        Date: <Moment format="DD/MM/YYYY">{createAt}</Moment>
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {products.map(product => (
                        <Col key={product._id} className='my-2'>
                            <SingleProduct product={product} />
                        </Col>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <h3>
                    Total: {total.toLocaleString()} VND
                </h3>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailsModal