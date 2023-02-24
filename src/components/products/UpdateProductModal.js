import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const UpdateProductModal = () => {
    const {
        productState: {product, brands, categories},
        getBrands,
        getCategories,
        showUpdateProduct,
        setShowUpdateProduct,
        updateProduct,
        setShowToast
    } = useContext(ProductContext)

    const [brandName, setBrandName] = useState(null)
    const [category, setCategory] = useState(null)
    const [updatedProduct, setUpdatedProduct] = useState(product)
    
    useEffect(() =>  {getBrands()}, [])
    useEffect(() => {getCategories()}, [])
	useEffect(() => setUpdatedProduct(product), [product])

	const { name, decription, price, image, stock } = updatedProduct

	const onChangeUpdatedProduct = event =>
    setUpdatedProduct({ ...updatedProduct, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedProduct(product)
		setShowUpdateProduct(false)
	}

    const updateBrand = (id) => {
        setUpdatedProduct(b => {
            return { ...b, brand: id}
        })
    }

    const updateCategory = (id) => {
        setUpdatedProduct(c => {
            return { ...c, category: id}
        })
    }

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateProduct(updatedProduct)
		setShowUpdateProduct(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

    return (
        <Modal show={showUpdateProduct} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    Update product information
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='text' 
                        placeholder='name' 
                        name='name' 
                        value={name}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        as='textarea'
                        placeholder='description' 
                        rows={3}
                        name='decription'
                        value={decription}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='text'
                        placeholder='price' 
                        name='price'
                        value={price}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='text'
                        placeholder='image url' 
                        name='image'
                        value={image}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='number'
                        placeholder='stock' 
                        name='stock'
                        value={stock}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
                        <div style={{ fontSize: "20px" }}>Brand: </div>
                        <DropdownButton
                            style={{ marginLeft: "20px" }}
                            title={brandName}
                            type="file"
                        >
                            {brands.map((item) => {
                                return (
                                    <>
                                    <div key={item._id}>
                                        <div key={item._id}>
                                            <div onClick={() => setBrandName(item.name)}>
                                                <Dropdown.Item
                                                    onClick={() => updateBrand(item._id)}
                                                >
                                                    {item.name}
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                );
                            })}
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
                        <div style={{ fontSize: "20px" }}>Category: </div>
                        <DropdownButton
                            style={{ marginLeft: "20px" }}
                            title={category}
                            type="file"
                        >
                            {categories.map((item) => {
                                return (
                                    <>
                                    <div key={item._id}>
                                        <div key={item._id}>
                                            <div onClick={() => setCategory(item.category)}>
                                                <Dropdown.Item
                                                    onClick={() => updateCategory(item._id)}
                                                >
                                                    {item.category}
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                );
                            })}
                        </DropdownButton>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Update</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateProductModal