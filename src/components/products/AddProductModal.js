import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const AddProductModal = () => {
    const {
        showModal,
        setShowModal,
        productState: {brands, categories},
        getBrands,
        getCategories,
        addProduct,
        setShowToast
    } = useContext(ProductContext)

    const closeDialog = () => {
        resetFormData()
    }

    const resetFormData = () => {
        setNewProduct({
            name: "",
            description: "",
            price: "",
            image: "",
            stock: "",
        })
        setShowModal(false)
    }

    useEffect(() =>  {getBrands()}, [])
    useEffect(() => {getCategories()}, [])

    const [brandName, setBrandName] = useState("choose Brand")
    const [brandId, setBrandId] = useState(null)
    const [categoryName, setCategoryName] = useState("choose Category")
    const [categoryId, setCategoryId] = useState(null)

    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        brand: "",
        category: "",
    })

    const {_id, name, description, price, image, stock, brand, category } = newProduct

    const onChangeNewProduct = (event) => 
        setNewProduct({ ...newProduct, [event.target.name]: event.target.value })

    const onChangeNewImage = (event) =>
        setNewProduct({ ...newProduct, image: event.target.files[0] });

    const onSubmit = async (event) => {
        console.log(newProduct)
        event.preventDefault()
        const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("stock", stock)
            formData.append("image", image, image.name)
            formData.append("brand", brandId)
            formData.append("category", categoryId)
        console.log(formData)
        try {
			const {success, message} = await addProduct(formData)
            resetFormData()
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		} catch (error) {
			console.log(error)
		}
    }

  return (
    <Modal show={showModal} onHide={closeDialog}>
        <Modal.Header>
            <Modal.Title>
                Add new product
            </Modal.Title>
        </Modal.Header>
        <Form key={_id} onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='text' 
                    placeholder='name' 
                    name='name' 
                    value={name}
                    onChange={onChangeNewProduct}/>
                </Form.Group>
                <Form.Group className='my-1'>
                    <Form.Control 
                    as='textarea'
                    placeholder='description' 
                    rows={3}
                    name='description'
                    value={description}
                    onChange={onChangeNewProduct}/>
                </Form.Group>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='number'
                    placeholder='price' 
                    name='price'
                    value={price}
                    onChange={onChangeNewProduct}/>
                </Form.Group>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='number'
                    placeholder='stock' 
                    name='stock'
                    value={stock}
                    onChange={onChangeNewProduct}/>
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
                <Button variant='primary' type='submit'>Create</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
}

export default AddProductModal