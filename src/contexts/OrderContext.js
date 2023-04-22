import { createContext, useReducer, useState } from "react";
import { orderReducer } from "../reducers/OrderReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const OrderContext = createContext()

const OrderContextProvider = ({children}) => {
    const [orderState, dispatch] = useReducer(orderReducer, {
        orderId: "",
        order: null,
        orders: []
    })

    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getOrders = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/order`)
            if (response.data.success) {
                dispatch({type: 'ORDER_LOADED_SUCCESS', payload: response.data.orders})
            }
        } catch (error) {
            dispatch({type: 'ORDER_LOADED_FAIL'})
        }
    }

    const getUserOrders = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order/user`)
            if (response.data.success) {
                dispatch({type: 'ORDER_LOADED_SUCCESS', payload: response.data.orders})
            }
        } catch (error) {
            dispatch({type: 'ORDER_LOADED_FAIL'})
        }
    }

    const findOrder = orderId => {
		const order = orderState.orders.find(order => order._id === orderId)
		dispatch({ type: 'FIND_ORDER', payload: order })
	}

    const saveOrder = Order => {
		dispatch({ type: 'SAVE_ORDER', payload: Order })
	}

    const addOrder = async newOrder => {
        try {
            const response = await axios.post(`${apiUrl}/order/add`, newOrder)
            if (response.data.success) {
                dispatch({type: 'ORDER_CREATED_SUCCESS', payload: response.data.order})
                sendmail(response.data.order)
                minunProduct(response.data.order)
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const sendmail = async order => {
        try {
            const response = await axios.post(`${apiUrl}/order/mailing`, order)
            if (response.data.success) {
                dispatch({type: 'SEND_MAIL_SUCCESS'})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const minunProduct = async order => {
        try {
            const response = await axios.put(`${apiUrl}/order/minunProduct`, order)
            if (response.data.success) {
                dispatch({type: 'SEND_MAIL_SUCCESS'})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const OrderContextData = {
        orderState,
        getOrders,
        getUserOrders,
        findOrder,
        saveOrder,
        addOrder,
        sendmail,
        minunProduct,
        showModal,
        setShowModal,
        showToast,
        setShowToast
    }

    return (
        <OrderContext.Provider value={OrderContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider