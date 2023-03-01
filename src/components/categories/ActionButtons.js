import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ProductContext } from '../../contexts/ProductContext'
import { useContext } from 'react'

const ActionButtons = ({ _id}) => {
    const {
        deleteCategory,
        findCategory,
        setShowUpdateModal
    } = useContext(ProductContext)

    const chooseCategory = categoryId => {
        findCategory(categoryId)
        setShowUpdateModal(true)
    }

    return (
        <>
        <Row className='row-cols-2'>
            <Button className='product-button'  onClick={chooseCategory.bind(this, _id)}>
                <img src={editIcon} alt="edit" width='30' height='60'/>
            </Button>
            <Button className='product-button' onClick={deleteCategory.bind(this, _id)}>
                <img src={deleteIcon} alt="delete" width='30' height='60'/>
            </Button>
        </Row>
        </>
    )
}

export default ActionButtons