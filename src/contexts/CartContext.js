import { createContext, useReducer, useState } from "react";
import { cartReducer } from "../reducers/CartReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [cartState, dispatch] = useReducer(cartReducer, {
        cart: null,
        carts: [],
        productsId: [],
        cartLoading: true
    })

    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const loadCart = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/cart`)
            if (response.data.loaded) {
                dispatch({type: 'CART_LOADED_SUCCESS', payload: response.data.cart})
            } else if (response.data.created) {
                dispatch({type: 'CART_CREATED_SUCCESS', payload: response.data.cart})
            }
        } catch (error) {
            dispatch({type: 'CART_LOADED_FAIL'})
        }
    }

    const addProduct = async product => {
        try {
            const response = await axios.put(`${apiUrl}/cart/add`, product)
            if (response.data.added) {
                dispatch({type: 'CART_ADDED_SUCCESS', payload: response.data.cart})
            } else if (response.data.created) {
                dispatch({type: 'CART_CREATED_SUCCESS', payload: response.data.cart})
            }
        } catch (error) {
            dispatch({type: 'CART_LOADED_FAIL'})
        }
    }

    const removeProduct = async product => {
        try {
            const response = await axios.put(`${apiUrl}/cart/remove`, product)
            if (response.data.removed) {
                dispatch({type: 'CART_REMOVED_SUCCESS', payload: response.data.cart})
            }
        } catch (error) {
            dispatch({type: 'CART_LOADED_FAIL'})
        }
    }

    const CartContextData = {
        cartState,
        loadCart,
        addProduct,
        removeProduct,
        showModal,
        setShowModal,
        showToast,
        setShowToast
    }

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider