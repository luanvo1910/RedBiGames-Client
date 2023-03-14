import { ProductContext } from "../contexts/ProductContext"
import { AuthContext } from "../contexts/AuthContext"
import { CartContext } from "../contexts/CartContext"
import { useContext, useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import SingleProduct from '../components/products/Product'
import ProductDetailsModal from '../components/products/ProductDetailsModal'
import CartModal from '../components/cart/CartModal'

const Dashboard = () => {
  
  const {
    productState: {product, products, productLoading},
    getProducts,
    searchProducts,
    searchString
  } = useContext(ProductContext)

  const {
    showToast: { show, message, type },
	  setShowToast
  } = useContext(CartContext)

  const {
		authState: {
			user
		}
	} = useContext(AuthContext)

  useEffect(() => {
    if (searchString != null) {
    searchProducts(searchString)
  } else {
    getProducts()
  }}, [searchString])

  let body = null
  if (productLoading) {
    body = (
      <>
      <div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
      </>
    )
  } else if (products.lenght === 0) {
    body = (
      <>
      <div className='text-center mx-5 my-5'>
        <h1>Welcome to RedBi games</h1>
        <h3>No products has been found</h3>
      </div>
      </>
    )
  } else {
    body = (
      <>
      <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
        {products.map(product => (
          <Col key={product._id} className='my-2'>
            <SingleProduct product={product} />
          </Col>
        ))}
      </Row>
      </>
    )
  }

  return (
    <>
    {body}
    {product !== null && <ProductDetailsModal/>}
    {user !== null && <CartModal/>}
    <Toast
      show={show}
      style={{ position: 'fixed', top: '20%', right: '10px' }}
      className={`bg-${type} text-white`}
      onClose={setShowToast.bind(this, {
        show: false,
        message: '',
        type: null
      })}
      delay={3000}
      autohide
	  >
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
	  </Toast>
    </>
  )
}

export default Dashboard