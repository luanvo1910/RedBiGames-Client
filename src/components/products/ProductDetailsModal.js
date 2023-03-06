import {useContext, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ProductDetailsModal = () => {
    const {
        productState: {product, brands, categories},
        getBrands,
        getCategories,
        showModal,
        setShowModal
    } = useContext(ProductContext)

    useEffect(() =>  {getBrands()}, [])
    useEffect(() => {getCategories()}, [])

    const brand = brands.map( b => {
        if(b._id === product.brand)
        {
            return b.name
        }
    })

    const category = categories.map( c => {
        if(c._id === product.category)
        {
            return c.category
        }
    })

    const closeDialog = () => {
        setShowModal(false)
	}

    return (
        <Modal show={showModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    <h1>
                        {product.name}
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <img 
                    src = {product.image}
                    className="mr-auto"      
                    height='100'
                    alt='product image'
                    />
                </div>
                <div>
                    <h5>
                        {product.decription}
                    </h5>
                    <p>
                        Its a {category} from {brand}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <h3>
                    Price: {product.price} VND
                </h3>
                <Button variant='secondary'>
                    Add to cart
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailsModal