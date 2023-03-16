import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/ProductReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {

    const [productState, dispatch] = useReducer(productReducer, {
        product: null,
        products: [],
        brand: null,
        brands: [],
        singleCategory: null,
        categories: [],
        productLoading: true
    })

    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})
    const [searchString, setSearchString] = useState("")

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

    const searchProducts = async query => {
        try {
            const response = await axios.get(`${apiUrl}/products/search?q=${query}`)
            if (response.data.success) {
                dispatch({type: 'PRODUCTS_LOADED_SUCCESS', payload: response.data.products})
            }
        } catch (error) {
            dispatch({type: 'PRODUCTS_LOADED_FAIL'})
        }
    }

    const addProduct = async newProduct => {
        try {
            console.log(newProduct)
            const response = await axios.post(`${apiUrl}/products/create`, newProduct, { headers: { "Content-Type": "multipart/form-data" } })
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
        // console.log(product)
		dispatch({ type: 'FIND_PRODUCT', payload: product })
	}

	const updateProduct = async updatedProduct => {
		try {
			const response = await axios.put(`${apiUrl}/products/update/${updatedProduct._id}`, updatedProduct, { headers: { "Content-Type": "multipart/form-data" } })
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

    const addBrand = async newBrand => {
        try {
            const response = await axios.post(`${apiUrl}/brands/create`, newBrand)
            if (response.data.success) {
                dispatch({type: 'BRAND_CREATED_SUCCESS', payload: response.data.brand})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const deleteBrand = async brandId => {
		try {
			const response = await axios.delete(`${apiUrl}/brands/delete/${brandId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_BRAND', payload: brandId })
		} catch (error) {
			console.log(error)
		}
	}

	const findBrand = brandId => {
		const brand = productState.brands.find(brand => brand._id === brandId)
		dispatch({ type: 'FIND_BRAND', payload: brand })
	}

	const updateBrand = async updatedBrand => {
		try {
			const response = await axios.put(`${apiUrl}/brands/update/${updatedBrand._id}`,updatedBrand)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_BRAND', payload: response.data.brand })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
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

    const addCategory = async newCategory => {
        try {
            const response = await axios.post(`${apiUrl}/categories/create`, newCategory)
            if (response.data.success) {
                dispatch({type: 'CATEGORIES_CREATED_SUCCESS', payload: response.data.category})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const deleteCategory = async categoryId => {
		try {
			const response = await axios.delete(`${apiUrl}/categories/delete/${categoryId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_CATEGORIES', payload: categoryId })
		} catch (error) {
			console.log(error)
		}
	}

	const findCategory = categoryId => {
		const singleCategory = productState.categories.find(category => category._id === categoryId)
		dispatch({ type: 'FIND_CATEGORIES', payload: singleCategory })
	}

	const updateCategory = async updatedCategory => {
		try {
			const response = await axios.put(`${apiUrl}/categories/update/${updatedCategory._id}`,updatedCategory)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_CATEGORIES', payload: response.data.category })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

    const productContextData = {
        productState,
        getProducts,
        addProduct,
        findProduct,
        deleteProduct,
        updateProduct,
        getBrands,
        addBrand,
        findBrand,
        deleteBrand,
        updateBrand,
        getCategories,
        addCategory,
        findCategory,
        deleteCategory,
        updateCategory,
        showModal,
        setShowModal,
        showUpdateModal,
        setShowUpdateModal,
        showToast,
        setShowToast,
        searchProducts,
        searchString,
        setSearchString
    }

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider