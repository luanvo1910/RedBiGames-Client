import {useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { ProductContext } from '../../contexts/ProductContext'
import { AuthContext } from '../../contexts/AuthContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SingleProduct from './ProductInCart'
import {Link} from 'react-router-dom'

const CartModal = () => {
    const {
        cartState: {productsId},
        loadCart,
        showModal,
        setShowModal
    } = useContext(CartContext)

    const {
        productState: {products},
        getProducts
    } = useContext(ProductContext)

    const {
		authState: {
			user
		}
	} = useContext(AuthContext)

    let total = 0

    useEffect(() => {loadCart()}, [])
    useEffect(() => {getProducts()}, [])

    const productsInCart = []
    products.map(p => {
        productsId.map(pId => {
            if (p._id === pId){
                productsInCart.push(p)
                total = total + p.price
            }
        })
    })

    const closeDialog = () => {
        setShowModal(false)
	}

    return (
        <Modal show={showModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    <h1>
                        {user.username}'s Cart
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {productsInCart.map(product => (
                        <Col key={product._id} className='my-2'>
                            <SingleProduct product={product} />
                        </Col>
                    ))}
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <h3>
                        Total: {total.toLocaleString()} USD
                    </h3>
                </Row>
                <Link to='/checkout'>
                    <Button variant='secondary' onClick={closeDialog}>
                        Checkout
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default CartModal