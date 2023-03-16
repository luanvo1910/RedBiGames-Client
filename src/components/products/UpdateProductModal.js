import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const UpdateProductModal = () => {
    const {
        productState: {product, brands, categories},
        getBrands,
        getCategories,
        showUpdateModal,
        setShowUpdateModal,
        updateProduct,
        setShowToast
    } = useContext(ProductContext)
    
    useEffect(() =>  {getBrands()}, [])
    useEffect(() => {getCategories()}, [])
    useEffect(() => setUpdatedProduct(product), [product])
    
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const { _id, name, description, price, image, stock, brand, category } = updatedProduct

    const bName = brands.map( b => {
        if(b._id === brand)
        {
            return b.name
        }
    })

    const cName = categories.map( c => {
        if(c._id === category)
        {
            return c.category
        }
    })

    const [brandName, setBrandName] = useState(bName)
    const [brandId, setBrandId] = useState()
    const [categoryName, setCategoryName] = useState(cName)
    const [categoryId, setCategoryId] = useState()

	const onChangeUpdatedProduct = event =>
        setUpdatedProduct({ ...updatedProduct, [event.target.name]: event.target.value })


	const closeDialog = () => {
		setUpdatedProduct(product)
        setShowUpdateModal(false)
	}

    const onChangeNewImage = (event) =>
        setUpdatedProduct({ ...updatedProduct, image: event.target.files[0] });

	const onSubmit = async event => {
		event.preventDefault()

        const formData = new FormData()
            formData.append("_id", _id)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("stock", stock)
            image && formData.append("image", image, image.name)
            formData.append("brand", brandId)
            formData.append("category", categoryId)

		const { success, message } = await updateProduct(updatedProduct)
		setShowUpdateModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    Update product information
                </Modal.Title>
                <img 
                src = {image}
                className="mr-auto"      
                height='100'
                alt='product image'
                />
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
                        name='description'
                        value={description}
                        onChange={onChangeUpdatedProduct}/>
                    </Form.Group>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='number'
                        placeholder='price' 
                        name='price'
                        value={price}
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
                    <Row>
                        <Col>
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
                                                <div onClick={() => setBrandName(item.name)}>
                                                    <Dropdown.Item
                                                        onClick={() => setBrandId(item._id)}
                                                        >
                                                        {item.name}
                                                    </Dropdown.Item>
                                                </div>
                                            </div>
                                            </>
                                        );
                                    })}
                                </DropdownButton>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
                                <div style={{ fontSize: "20px" }}>Category: </div>
                                <DropdownButton
                                    style={{ marginLeft: "20px" }}
                                    title={categoryName}
                                    type="file"
                                    >
                                    {categories.map((item) => {
                                        return (
                                            <>
                                            <div key={item._id}>
                                                <div onClick={() => setCategoryName(item.category)}>
                                                    <Dropdown.Item
                                                        onClick={() => setCategoryId(item._id)}
                                                        >
                                                        {item.category}
                                                    </Dropdown.Item>
                                                </div>
                                            </div>
                                            </>
                                        );
                                    })}
                                </DropdownButton>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
                        <input
                            type="file"
                            placeholder="Upload file"
                            name="image"
                            onChange={onChangeNewImage}
                        />
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