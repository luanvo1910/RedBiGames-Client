export const cartReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'CART_LOADED_SUCCESS':
            return {
                ...state,
                cart: payload,
                productsId: payload.products,
                cartLoading: false
            }
        case 'CART_LOADED_FAIL':
            return {
                ...state,
                payload: [],
                cartLoading: false
            }
        case 'CART_CREATED_SUCCESS':
           return {
                ...state,
                carts: [...state.carts, payload]
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