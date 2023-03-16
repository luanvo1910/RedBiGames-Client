import {useContext, useEffect, useState} from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import { CartContext } from '../../contexts/CartContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ProductDetailsModal = () => {
    const {
        productState: {product,
            brands, 
            categories},
        getBrands,
        getCategories,
        showModal,
        setShowModal
    } = useContext(ProductContext)

    const {
        addProduct
    } = useContext(CartContext)

    const [showProduct, setShowProduct] = useState(product)
    useEffect(() => setShowProduct(product), [product])
    const { name, description, price, image, brand, category } = showProduct

    useEffect(() =>  {getBrands()}, [])
    useEffect(() => {getCategories()}, [])

    const brandName = brands.map( b => {
        if(b._id === brand)
        {
            return b.name
        }
    })

    const categoryName = categories.map( c => {
        if(c._id === category)
        {
            return c.category
        }
    })

    const closeDialog = () => {
        setShowModal(false)
	}

    const addProductToCart = product => {
        addProduct(product)
        setShowModal(false)
    }

    return (
        <Modal show={showModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    <h1>
                        {name}
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <img 
                    src = {image}
                    className="mr-auto"      
                    height='100'
                    alt='product image'
                    />
                </div>
                <div>
                    <h5>
                        Its a {categoryName} from {brandName}  
                    </h5>
                    <p>
                        {description}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <h3>
                    Price: {price} VND
                </h3>
                <Button variant='secondary' onClick={addProductToCart.bind(this, product)}>
                    Add to cart
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailsModal