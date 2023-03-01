import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ActionButtons from './ActionButtons'

const Brand = ({brand: {_id, name}}) => (
    <Card className='shadow ' border='info'>
        <Row>
        <Col>
            <Card.Body className='text-center'>
                <Card.Title>
                    <p className='product-title'>{name}</p>
                </Card.Title>
            </Card.Body>
        </Col>
        <Col>
            <ActionButtons _id={_id}/>
        </Col>
        </Row>
    </Card>
)

export default Brand