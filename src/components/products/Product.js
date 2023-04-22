import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { ProductContext } from '../../contexts/ProductContext'
import { useContext } from 'react'

const Product = ({product: {_id, name, price, image, stock }}) => {
    const {
        findProduct,
        setShowModal
    } = useContext(ProductContext)

    const chooseProduct = productId => {
        findProduct(productId)
        setShowModal(true)
    }

    return (
    <>
    <Card className='shadow ' border={stock === 0 ? 'secondary' : 'info'}>
        {/* <Card.img 
            variant="top"
            style={{ borderRadius: "20px 20px 0px 0px" }}
            height={300}
            width={180}
            src={image}/> */}
        <img 
            src = {image}
            className="mr-2"      
			height='200'
            alt='product image'
        />
        <Card.Body className='text-center'>
            <Card.Title>
                <p className='product-title'>{name}</p>
            </Card.Title>
            <Card.Subtitle>
                <p className='mb-2 text-muted'>{price.toLocaleString()} USD</p>
            </Card.Subtitle>
            <Badge pill variant={stock === 0 ? 'danger' : 'success'}>
                Stock: {stock}
            </Badge>
        </Card.Body>
        <Button className='product-button' onClick={chooseProduct.bind(this, _id)}>
            Details
        </Button>
    </Card>
    </>
    )
}
export default Product