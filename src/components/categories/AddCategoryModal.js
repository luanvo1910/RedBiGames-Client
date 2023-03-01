import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const AddCategoryModal = () => {
    const {
        showModal,
        setShowModal,
        addCategory,
        setShowToast
    } = useContext(ProductContext)

    const closeDialog = () => {
        resetFormData()
    }

    const resetFormData = () => {
        setNewCategory({
            category: "",
        })
        setShowModal(false)
    }

    const [newCategory, setNewCategory] = useState({
        category: "",
    })

    const {_id, category } = newCategory

    const onChangeNewCategory = event => 
    setNewCategory({ 
            ...newCategory, 
            [event.target.name]: event.target.value
        })

    const onSubmit = async event => {
        event.preventDefault()
        try {
			const {success, message} = await addCategory(newCategory)
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
                Add new category
            </Modal.Title>
        </Modal.Header>
        <Form key={_id} onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Group className='my-1'>
                    <Form.Control 
                    type='text' 
                    placeholder='category' 
                    name='category' 
                    value={category}
                    onChange={onChangeNewCategory}/>
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

export default AddCategoryModal