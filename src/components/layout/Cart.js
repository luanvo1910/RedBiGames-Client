import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import cartIcon from '../../assets/cart.svg'
import Button from 'react-bootstrap/Button'

const Cart = () =>
{
  const { loadCart, setShowModal } = useContext(CartContext)

  const cart = () => {
    loadCart()
    setShowModal(true)
  }

  return (
    <Button
		variant='light'
		className='font-weight-bolder text-white'
		onClick={cart}
	>
		<img
            src={cartIcon}
            alt='cartIcon'
            width='32'
            height='32'
            className='mx-2'
		/>
	</Button>
  )
}

export default Cart


                    

