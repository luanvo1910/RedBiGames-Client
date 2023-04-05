import { ProductContext } from "../contexts/ProductContext"
import { useContext, useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip  from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import addIcon from '../assets/plus-circle-fill.svg'
import SingleProduct from '../components/Products/ProductManage'
import AddProductModal from '../components/Products/AddProductModal'
import UpdateProductModal from "../components/Products/UpdateProductModal"

const Dashboard = () => {
  
  const {
    productState: {product, products, productLoading},
    getProducts,
    setShowModal,
    showToast: { show, message, type },
		setShowToast
  } = useContext(ProductContext)

  useEffect(() => {getProducts()}, [])

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
        <h3>No produucts has been found</h3>
      </div>
      <OverlayTrigger placement='left' overlay={<Tooltip>Add new product</Tooltip>}>
        <Button className='btn-floating' onClick={setShowModal.bind(this, true)}>
            <img src={addIcon} alt="add product" witdh='60' height='60'/>
        </Button>
      </OverlayTrigger>
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
      <OverlayTrigger placement='left' overlay={<Tooltip>Add new product</Tooltip>}>
        <Button className='btn-floating' onClick={setShowModal.bind(this, true)}>
            <img src={addIcon} alt="add product" witdh='60' height='60'/>
        </Button>
      </OverlayTrigger>
      </>
    )
  }

  return (
    <>
    {body}
    <AddProductModal />
    {/* <UpdateProductModal /> */}
    {product !== null && <UpdateProductModal />}
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