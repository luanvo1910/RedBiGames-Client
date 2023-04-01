import { createContext, useReducer, useState } from "react";
import { orderReducer } from "../reducers/OrderReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const OrderContext = createContext()

const OrderContextProvider = ({children}) => {
    const [orderState, dispatch] = useReducer(orderReducer, {
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

    const userList = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order/user`)
            if (response.data.loaded) {
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

    const addOrder = async newOrder => {
        try {
            console.log(newOrder)
            const response = await axios.post(`${apiUrl}/order/add`, newOrder)
            if (response.data.success) {
                dispatch({type: 'ORDER_CREATED_SUCCESS', payload: response.data.order})
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
        userList,
        findOrder,
        addOrder,
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