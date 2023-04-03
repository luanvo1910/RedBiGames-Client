import { OrderContext } from "../contexts/OrderContext"
import { useContext, useEffect } from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SingleOrder from '../components/Order/SingleOrder'
import OrderDetailsModal from '../components/Order/OrderDetailsModal'


const Orders = () => {
  
  const {
    orderState: {orders, order},
    getUserOrders
  } = useContext(OrderContext)

  useEffect(() => {getUserOrders()}, [])

  let body = null
  if (orders.lenght === 0) {
    body = (
      <>
      <div className='text-center mx-5 my-5'>
        <h3>No order has been found</h3>
      </div>
      </>
    )
  } else {
    body = (
      <>
      {orders.map(order => (
        <Col key={order._id} className='my-2'>
          <SingleOrder order={order} />
        </Col>
      ))}
      </>
    )
  }

  return (
    <>
    <Row>
        <Col>
            <h1>User's name</h1>
        </Col>
        <Col>
            <h1>Total</h1>
        </Col>
        <Col>
            <h1>Date</h1>
        </Col>
        <Col>
            <h1>Details</h1>
        </Col>
        </Row>
    {body}
    {order !== null && <OrderDetailsModal />}
    </>
  )
}

export default Orders