import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ProductInCart = ({product}) => {
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
export default ProductInCart