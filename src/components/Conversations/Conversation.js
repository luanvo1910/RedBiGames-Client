import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ChatContext } from '../../contexts/ChatContext'
import { useContext } from 'react'

const Product = ({conversation}) => {
    const {
        findConversation,
        setShowChat
    } = useContext(ChatContext)

    const loadChat = conversationId => {
        findConversation(conversationId)
        setShowChat(true)
    }

    return (
    <>
    <Card className='shadow '>
        <Card.Body className='text-center'>
            <Card.Title>
                <p className='product-title'>{conversation.userId.username}</p>
            </Card.Title>
            <Card.Subtitle>
                <p className='mb-2 text-muted'>{conversation.messages.lenght} messages</p>
            </Card.Subtitle>
        </Card.Body>
        <Button className='product-button' onClick={loadChat.bind(this, conversation._id)}>
            Details
        </Button>
    </Card>
    </>
    )
}
export default Product