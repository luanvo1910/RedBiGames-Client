import {useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../contexts/ChatContext'
import { AuthContext } from '../../contexts/AuthContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import SingleMessage from './Message'

const ChatBox = () => {
    const {
        chatState: {conversation},
        addMessage,
        showChat,
        setShowChat
    } = useContext(ChatContext)


    const {
		authState: {
			user
		}
	} = useContext(AuthContext)

    const closeDialog = () => {
        setShowChat(false)
        resetFormData()
	}

    const resetFormData = () => {
        setMessage({
            content: "",
        })
    }

    const [message, setMessage] = useState({
        conversationId: "",
        content: ""
    })

    const {_id, content, conversationId } = message

	const onChangeMessage = event =>
    setMessage({ 
        ...message, 
        conversationId: conversation._id,
        [event.target.name]: event.target.value
    })

    const onSubmit = async event => {
        
        event.preventDefault()
        try {
            console.log(message)
            await addMessage(message)
            resetFormData()
        } catch (error) {
            console.log(error)
        }
	}

    let body = null
    if (conversation.messages.lenght === 0) {
        body = (
            <>
            <div className='text-center mx-5 my-5'>
              <h1>Hello {user.username}</h1>
              <h3>How can I help you</h3>
            </div>
            </>
          )
    } else {
        const messages = conversation.messages
        body = (
            <>
            <div style={{ height: '350px', overflowY: 'auto' }}>
                <Table>
                    {messages.map(message => (
                        <Col key={message._id} className='my-2'>
                            <SingleMessage message={message} user={conversation.userId.username}/>
                        </Col>
                    ))}
                </Table>
            </div>
            </>
        )
    }

    return (
        <Modal show={showChat} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>
                    <h1>
                        {conversation.userId.username}'s chat with Admin
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Form key={_id} onSubmit={onSubmit}>
                <Modal.Body>
                    {body}
                    <Form.Group className='my-1'>
                            <Form.Control 
                            as='textarea'
                            placeholder='message' 
                            rows={2}
                            name='content'
                            value={content}
                            onChange={onChangeMessage}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' type='submit'>Send</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ChatBox