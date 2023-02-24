import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import AlertMessage from '../layout/AlertMessage'

const AddProductModal = () => {
    const {
        showAddProduct,
        setShowAddProduct,
        productState: {brands, categories},
        getBrands,
        getCategories,
        addProduct
    } = useContext(ProductContext)

    const closeDialog = () => {
        resetFormData()
    }

    const resetFormData = () => {
        setNewProduct({
            name: "",
            decription: "",
            price: "",
            image: "",
            stock: "",
        })
        setShowAddProduct(false)
    }

    useEffect(() =>  {getBrands()}, [])

    useEffect(() => {getCategories()}, [])

    const [brandName, setBrandName] = useState(null)
    const [category, setCategory] = useState(null)
    
    const [alert, setAlert] = useState(null)

    const [newProduct, setNewProduct] = useState({
        name: "",
        decription: "",
        price: "",
        image: "",
        stock: "",
        brand: "",
        category: "",
    })

    const {_id, name, decription, price, image, stock } = newProduct

    const onChangeNewProduct = event => 
        setNewProduct({ 
            ...newProduct, 
            [event.target.name]: event.target.value
        })

    const updateBrand = (id) => {
        setNewProduct(b => {
            return { ...b, brand: id}
        })
    }

    const updateCategory = (id) => {
        setNewProduct(c => {
            return { ...c, category: id}
        })
    }

    const onSubmit = async event => {
        event.preventDefault()
        try {
			const addProductData = await addProduct(newProduct)
			if (!addProductData.success) {
				setAlert({ type: 'danger', message: addProductData.message })
				setTimeout(() => setAlert(null), 5000)
			}
            closeDialog()
		} catch (error) {
			console.log(error)
		}
    }

  return (
    <Modal show={showAddProduct} onHide={closeDialog}>
        <Modal.Header>
            <Modal.Title>
                Add new prodduct
            </Modal.Title>
        </Modal.Header>
        <Form key={_id} onSubmit={onSubmit}>
            <AlertMessage info={alert} />
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
                    name='decription'
                    value={decription}
                    onChange={onChangeNewProduct}/>
                </Form.Group>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='text'
                    placeholder='price' 
                    name='price'
                    value={price}
                    onChange={onChangeNewProduct}/>
                </Form.Group>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='text'
                    placeholder='image url' 
                    name='image'
                    value={image}
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
                <Button variant='primary' type='submit'>Create</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
}

export default AddProductModal