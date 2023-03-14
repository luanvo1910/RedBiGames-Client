import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import deleteIcon from '../../assets/trash.svg'
import { CartContext } from '../../contexts/CartContext'
import { useContext } from 'react'

const ProductInCart = ({product}) => {
    const {
        removeProduct
    } = useContext(CartContext)

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
            <Col>
                <Button className='product-button' onClick={removeProduct.bind(this, product)}>
                    <img src={deleteIcon} alt="delete" width='30' height='60'/>
                </Button>
            </Col>
        </Row>
    </Card>
    </>
    )
}
export default ProductInCart