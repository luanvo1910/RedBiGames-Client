import { createContext, useReducer, useState } from "react";
import { chatReducer } from "../reducers/ChatReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const ChatContext = createContext()

const ChatContextProvider = ({children}) => {
    const [chatState, dispatch] = useReducer(chatReducer, {
        conversation: null,
        conversations: []
    })

    const [showChat, setShowChat] = useState(false)

    const listConversationAdmin = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/chat/admin`)
            if (response.data.success) {
                dispatch({type: 'CHAT_LOADED_SUCCESS', payload: response.data.conversations})
            }
        } catch (error) {
            dispatch({type: 'CHAT_LOADED_FAIL'})
        }
    }

    const findConversation = async conversationId =>{
        const conversation = chatState.conversations.find(conversation => conversation._id === conversationId)
		dispatch({ type: 'FIND_CHAT', payload: conversation })
    }

    const loadConversation = async () => {
        try {
            const response = await axios.get(`${apiUrl}/chat`)
            if (response.data.success) {
                dispatch({type: 'CONVERSATION_LOADED_SUCCESS', payload: response.data.conversation})
            }
        } catch (error) {
            dispatch({type: 'CONVERSATION_LOADED_FAIL'})
        }
    }

    const addMessage = async message => {
        try {
            const response = await axios.post(`${apiUrl}/chat/message`, message)
            if (response.data.success) {
                dispatch({type: 'MESSAGE_CREATED_SUCCESS', payload: response.data.conversation})
            }
        } catch (error) {
            dispatch({type: 'MESSAGE_CREATED_FAIL'})
        }
    }

    const ChatContextData = {
        chatState,
        listConversationAdmin,
        loadConversation,
        addMessage,
        findConversation,
        showChat,
        setShowChat
    }

    return (
        <ChatContext.Provider value={ChatContextData}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider