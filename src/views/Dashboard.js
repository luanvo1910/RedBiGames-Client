import { ProductContext } from "../contexts/ProductContext"
import { useContext, useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SingleProduct from '../components/products/Product'

const Dashboard = () => {
  
  const {
    productState: {products, productLoading, brands, categories},
    getProducts,
    getBrands,
    getCategories
  } = useContext(ProductContext)

  useEffect(() => {getProducts()}, [])
  useEffect(() => {getBrands()}, [])
  useEffect(() => {getCategories()}, [])

  const [brandId, setBrandId] = useState(null)
  const [brandName, setBrandName] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [category, setCategory] = useState(null)

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
    if (categoryId || brandId) {
      body = (
        <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {products.map(product => (product.category === categoryId)(
            <Col key={product._id} className='my-2'>
              <SingleProduct product={product} />
            </Col>
          ))}
        </Row>
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
  }

  let filter = (
    <>
    <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
      <div style={{ fontSize: "20px" }}>Category: </div>
      <DropdownButton
        style={{ marginLeft: "20px" }}
        title={category}
        type="file"
      >
        {categories.map((item) => {
          return (
            <>
              <div key={item._id}>
                <div key={item._id}>
                  <div onClick={() => setCategory(item.category)}>
                    <Dropdown.Item
                      onClick={() => setCategoryId(item._id)}
                    >
                      {item.category}
                    </Dropdown.Item>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </DropdownButton>
    </Form.Group>
    <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
      <div style={{ fontSize: "20px" }}>Brand: </div>
      <DropdownButton
        style={{ marginLeft: "20px" }}
        title={brandName}
        type="file"
      >
        {brands.map((item) => {
          return (
            <>
              <div key={item._id}>
                <div key={item._id}>
                  <div onClick={() => setBrandName(item.name)}>
                    <Dropdown.Item
                      onClick={() => setBrandId(item._id)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </DropdownButton>
    </Form.Group>
    </>
  )

  return (
    <>
    {filter}
    {body}
    </>
  )
}

export default Dashboard