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
        case 'BRAND_CREATED_SUCCESS':
            return {
                 ...state,
                 brands: [...state.brands, payload]
             }
        case 'DELETE_BRAND':
            return {
                ...state,
                brands: state.brands.filter(brand => brand._id !== payload)
            }
        case 'FIND_BRAND':
            return { ...state, brand: payload }
        case 'UPDATE_BRAND':
            const newBrand = state.brands.map(brand =>
                brand._id === payload._id ? payload : brand
            )
            return {
                ...state,
                brands: newBrand
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
        case 'CATEGORIES_CREATED_SUCCESS':
            return {
                 ...state,
                 categories: [...state.categories, payload]
             }
        case 'DELETE_CATEGORIES':
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== payload)
            }
        case 'FIND_CATEGORIES':
            return { ...state, singleCategory: payload }
        case 'UPDATE_CATEGORIES':
            const newCategory = state.categories.map(category =>
                category._id === payload._id ? payload : category
            )
            return {
                ...state,
                categories: newCategory
            }

        default:
            return state
    }
}