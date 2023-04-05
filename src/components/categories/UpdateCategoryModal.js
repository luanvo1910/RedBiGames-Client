import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useContext, useState, useEffect} from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const UpdateCategoryModal = () => {
    const {
        productState: {singleCategory},
        showUpdateModal,
        setShowUpdateModal,
        updateCategory,
        setShowToast
    } = useContext(ProductContext)

    const [updatedCategory, setUpdatedCategory] = useState(singleCategory)
    
	useEffect(() => setUpdatedCategory(singleCategory), [singleCategory])

	const { category } = updatedCategory

	const onChangeUpdatedCategory = event =>
    setUpdatedCategory({ ...updatedCategory, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCategory(singleCategory)
        setShowUpdateModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCategory(updatedCategory)
		setShowUpdateModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    Update category
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-1'>
                        <Form.Control 
                        type='text' 
                        placeholder='name' 
                        name='category' 
                        value={category}
                        onChange={onChangeUpdatedCategory}/>
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

export default UpdateCategoryModal