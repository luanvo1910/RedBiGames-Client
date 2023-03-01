import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const UpdateBrandModal = () => {
    const {
        productState: {brand},
        showUpdateModal,
        setShowUpdateModal,
        updateBrand,
        setShowToast
    } = useContext(ProductContext)

    const [updatedBrand, setUpdatedBrand] = useState(brand)
    
	useEffect(() => setUpdatedBrand(brand), [brand])

	const { name } = updatedBrand

	const onChangeUpdatedBrand = event =>
    setUpdatedBrand({ ...updatedBrand, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedBrand(brand)
        setShowUpdateModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateBrand(updatedBrand)
		setShowUpdateModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    Update brand
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
                        onChange={onChangeUpdatedBrand}/>
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

export default UpdateBrandModal