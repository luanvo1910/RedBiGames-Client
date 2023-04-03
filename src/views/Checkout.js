import {useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'
import { OrderContext } from '../contexts/OrderContext'
import { AuthContext } from '../contexts/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import SingleProduct from '../components/Order/ProductInOrder'
import OrderComfirm from '../components/Order/OrderComfirmModal'

const Checkout = () => {
    const {
		authState: {
			user
		}
	} = useContext(AuthContext)

    const {
        cartState: {productsId},
        loadCart
    } = useContext(CartContext)

    const {
        productState: {products},
        getProducts
    } = useContext(ProductContext)

    const {
        orderState: {order},
        addOrder,
        setShowModal,
        setShowToast
    } = useContext(OrderContext)

    let totalPrice = 0

    useEffect(() => {loadCart()}, [])
    useEffect(() => {getProducts()}, [])

    const productsInCart = []
    products.map(p => {
        productsId.map(pId => {
            if (p._id === pId){
                productsInCart.push(p)
                totalPrice = totalPrice + p.price
            }
        })
    })

    const [checkoutForm, setCheckoutForm] = useState({
        userId: "",
        total: "",
        email: "",
        address: "",
        products: [],
    })

    const [email, setEmail] = useState();
    const [address, setAddress] = useState();

	const onChangeEmail = event =>
        setEmail(event.target.value)

    const onChangeAddress = event =>
        setAddress(event.target.value)

    const onSubmit = async (event) => {
        if (totalPrice > 0){
            setCheckoutForm({ ...checkoutForm,
                userId: user._id,
                total: totalPrice,
                email: email,
                address: address,
                products: productsId
            })
            event.preventDefault()
            try {
                console.log(checkoutForm)
                const {success, message} = await addOrder(checkoutForm)
                setShowModal(true)
                setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            } catch (error) {
                console.log(error)
            }
        }
    }    

    return (
        <>
        {order !== null && <OrderComfirm/>}
        <h1>CHECKOUT {user.username.toUpperCase()} ORDER</h1>
        <Row>
            {productsInCart.map(product => (
                <Row key={product._id} className='my-2'>
                    <SingleProduct product={product} />
                </Row>
            ))}
        </Row>
        <Row>
            <h3>
                Total: {totalPrice.toLocaleString()} VND
            </h3>
        </Row>
        <Form className='my-4' onSubmit={onSubmit}>
            <Form.Group>
                <Form.Control
                    className='my-2'
                    type='text' 
                    placeholder='Email' 
                    name='email'
                    value={email || ''}
                    onChange={onChangeEmail} 
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    className='my-2'
                    type='text' 
                    placeholder='Address - house number, street, district, city' 
                    name='address'
                    value={address || ''}
                    onChange={onChangeAddress} 
                    required/>
            </Form.Group>
            <Button 
                variant='success' 
                type='submit'>
                    Confirm
            </Button>
        </Form>
        </>
    )
}

export default Checkout