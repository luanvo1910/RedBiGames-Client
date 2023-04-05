export const chatReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'CHAT_LOADED_SUCCESS':
            return {
                ...state,
                conversations: payload
            }
        case 'CHAT_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'CONVERSATION_LOADED_SUCCESS':
           return {
                ...state,
                conversation: payload
            }
        case 'CONVERSATION_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'MESSAGE_CREATED_SUCCESS':
            return {
                ...state,
                conversation: payload
            }
        case 'MESSAGE_CREATED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'FIND_CHAT':
            return {
                ...state,
                conversation: payload
            }

        default:
            return state
    }
}