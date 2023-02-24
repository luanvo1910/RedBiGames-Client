import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/ProductReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {

    const [productState, dispatch] = useReducer(productReducer, {
        product: null,
        products: [],
        brands: [],
        categories: [],
        productLoading: true
    })

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showUpdateProduct, setShowUpdateProduct] = useState(false)
    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getProducts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/products`)
            if (response.data.success) {
                dispatch({type: 'PRODUCTS_LOADED_SUCCESS', payload: response.data.products})
            }
        } catch (error) {
            dispatch({type: 'PRODUCTS_LOADED_FAIL'})
        }
    }

    const addProduct = async newProduct => {
        try {
            const response = await axios.post(`${apiUrl}/products/create`, newProduct)
            if (response.data.success) {
                dispatch({type: 'PRODUCTS_CREATED_SUCCESS', payload: response.data.product})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const deleteProduct = async productId => {
		try {
			const response = await axios.delete(`${apiUrl}/products/delete/${productId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_PRODUCT', payload: productId })
		} catch (error) {
			console.log(error)
		}
	}

	const findProduct = productId => {
		const product = productState.products.find(product => product._id === productId)
		dispatch({ type: 'FIND_PRODUCT', payload: product })
	}

	const updateProduct = async updatedProduct => {
        console.log(updatedProduct)
		try {
			const response = await axios.put(`${apiUrl}/products/update/${updatedProduct._id}`,updatedProduct)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_PRODUCT', payload: response.data.product })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

    const getBrands = async() => {
        try {
            const response = await axios.get(`${apiUrl}/brands`)
            if (response.data.success) {
                dispatch({type: 'BRANDS_LOADED_SUCCESS', payload: response.data.brands})
            }
        } catch (error) {
            dispatch({type: 'BRANDS_LOADED_FAIL'})
        }
    }

    const getCategories = async() => {
        try {
            const response = await axios.get(`${apiUrl}/categories`)
            if (response.data.success) {
                dispatch({type: 'CATEGORIES_LOADED_SUCCESS', payload: response.data.categories})
            }
        } catch (error) {
            dispatch({type: 'CATEGORIES_LOADED_FAIL'})
        }
    }

    const productContextData = {
        productState,
        getProducts,
        getBrands,
        getCategories,
        addProduct,
        findProduct,
        deleteProduct,
        updateProduct,
        showAddProduct,
        setShowAddProduct,
        showUpdateProduct,
        setShowUpdateProduct,
        showToast,
        setShowToast
    }

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider