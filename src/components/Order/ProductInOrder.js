import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const ProductInOrder = ({product}) => {

    return (
    <>
    <Card className='shadow ' border='info'>
        <Row>
            <Col>
                <img 
                    src = {product.image}
                    className="mr-2"      
                    width='80'
                    alt='product image'
                    />
            </Col>
            <Col>
                {product.name}
            </Col>
            <Col>
                {product.price.toLocaleString()}
            </Col>
        </Row>
    </Card>
    </>
    )
}
export default ProductInOrder