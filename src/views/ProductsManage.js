import { ProductContext } from "../contexts/ProductContext"
import { useContext, useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip  from 'react-bootstrap/Tooltip'
import addIcon from '../assets/plus-circle-fill.svg'
import SingleProduct from '../components/products/ProductManage'
import AddProductModal from '../components/products/AddProductModal'
import UpdateProductModal from "../components/products/UpdateProductModal"

const Dashboard = () => {
  
  const {
    productState: {products, productLoading},
    getProducts,
    setShowAddProduct
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
        <Button className='btn-floating' onClick={setShowAddProduct.bind(this, true)}>
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
    <UpdateProductModal />
    </>
  )
}

export default Dashboard