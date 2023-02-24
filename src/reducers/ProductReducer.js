export const productReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'PRODUCTS_LOADED_SUCCESS':
            return {
                ...state,
                products: payload,
                productLoading: false
            }
        case 'PRODUCTS_LOADED_FAIL':
            return {
                ...state,
                payload: [],
                productLoading: false
            }
        case 'BRANDS_LOADED_SUCCESS':
            return {
                ...state,
                brands: payload
            }
        case 'BRANDS_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'CATEGORIES_LOADED_SUCCESS':
            return {
                ...state,
                categories: payload
            }
        case 'CATEGORIES_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'PRODUCTS_CREATED_SUCCESS':
           return {
                ...state,
                products: [...state.products, payload]
            }
        case 'DELETE_PRODUCT':
            return {
                 ...state,
                 products: state.products.filter(product => product._id !== payload)
            }
        case 'FIND_PRODUCT':
            return { ...state, product: payload }
        case 'UPDATE_PRODUCT':
            const newProducts = state.products.map(product =>
                product._id === payload._id ? payload : product
            )
            return {
                ...state,
                products: newProducts
            }

        default:
            return state
    }
}