import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const AddBrandModal = () => {
    const {
        showModal,
        setShowModal,
        addBrand,
        setShowToast
    } = useContext(ProductContext)

    const closeDialog = () => {
        resetFormData()
    }

    const resetFormData = () => {
        setNewBrand({
            name: "",
        })
        setShowModal(false)
    }

    const [newBrand, setNewBrand] = useState({
        name: "",
    })

    const {_id, name } = newBrand

    const onChangeNewBrand = event => 
        setNewBrand({ 
            ...newBrand, 
            [event.target.name]: event.target.value
        })

    const onSubmit = async event => {
        event.preventDefault()
        try {
			const {success, message} = await addBrand(newBrand)
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
                Add new brand
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
                    onChange={onChangeNewBrand}/>
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

export default AddBrandModal