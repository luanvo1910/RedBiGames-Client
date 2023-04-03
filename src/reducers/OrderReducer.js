export const orderReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'ORDER_LOADED_SUCCESS':
            return {
                ...state,
                orders: payload
            }
        case 'ORDER_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'SEND_MAIL_SUCCESS':
            return {
                ...state,
                order: null
            }
        case 'FIND_ORDER':
            return { ...state, order: payload }
        case 'ORDER_CREATED_SUCCESS':
            return {
                ...state,
                order: payload
            }
        default:
            return state
    }
}