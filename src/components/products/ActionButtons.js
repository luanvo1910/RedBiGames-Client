import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ProductContext } from '../../contexts/ProductContext'
import { useContext } from 'react'

const ActionButtons = ({ _id}) => {
    const {
        deleteProduct,
        findProduct,
        setShowUpdateModal
    } = useContext(ProductContext)

    const chooseProduct = productId => {
        findProduct(productId)
        setShowUpdateModal(true)
    }

    return (
        <>
        <Button className='product-button' onClick={chooseProduct.bind(this, _id)}>
            <img src={editIcon} alt="edit" width='24' height='24'/>
        </Button>
        <Button className='product-button' onClick={deleteProduct.bind(this, _id)}>
            <img src={deleteIcon} alt="delete" width='24' height='24'/>
        </Button>
        </>
    )
}

export default ActionButtons