import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from '../layout/ActionButtons'

const Product = ({product: {_id, name, price, image, stock }}) => (
    <Card className='shadow ' border={stock === 0 ? 'secondary' : 'info'}>
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
                <p className='mb-2 text-muted'>{price}</p>
            </Card.Subtitle>
            <Badge pill variant={stock === 0 ? 'danger' : 'success'}>
                Stock: {stock}
            </Badge>
        </Card.Body>
        <ActionButtons _id={_id}/>
    </Card>
)

export default Product