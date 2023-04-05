export const cartReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'CART_LOADED_SUCCESS':
            return {
                ...state,
                cart: payload,
                productsId: payload.products
            }
        case 'CART_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'CART_CREATED_SUCCESS':
           return {
                ...state,
                cart: payload,
                productsId: payload.products
            }
        case 'CART_ADDED_SUCCESS':
            return {
                ...state,
                cart: payload,
                productsId: payload.products
            }
        case 'CART_REMOVED_SUCCESS':
            return {
                ...state,
                cart: payload,
                productsId: payload.products
            }

        default:
            return state
    }
}