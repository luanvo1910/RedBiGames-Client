import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import Moment from 'react-moment';

const SingleOrder = ({order}) => {
    const {
        findOrder,
        setShowModal
    } = useContext(OrderContext)

    const chooseOrder = Id => {
        findOrder(Id)
        setShowModal(true)
    }
    
    return (
    <Card className='shadow ' border='info'>
        <Row>
        <Col>
            <h3>{order.userId.username}</h3>
        </Col>
        <Col>
            <h3>{order.total.toLocaleString()}</h3>
        </Col>
        <Col>
            <h3><Moment format="DD/MM/YYYY">{order.createAt}</Moment></h3>
        </Col>
        <Col>
            <Button className='product-button' onClick={chooseOrder.bind(this, order._id)}>
                Details
            </Button>
        </Col>
        </Row>
    </Card>
)}

export default SingleOrder