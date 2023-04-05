import { ChatContext } from "../contexts/ChatContext"
import { useContext, useEffect } from "react"
import ChatBox from '../components/Conversations/ChatBox'
import Col from 'react-bootstrap/Col'
import SingleConversation from '../components/Conversations/Conversation'

const AdminConversations = () => {
  
  const {
    chatState: {conversations, conversation},
    listConversationAdmin
  } = useContext(ChatContext)

  useEffect(() => {listConversationAdmin()}, [])

  let body = null
  if (conversations.lenght === 0) {
    body = (
      <>
      <div className='text-center mx-5 my-5'>
        <h3>No conversations has been found</h3>
      </div>
      </>
    )
  } else {
    body = (
      <>
      {conversations.map(conversation => (
        <Col key={conversation._id} className='my-2'>
          <SingleConversation conversation={conversation} />
        </Col>
      ))}
      </>
    )
  }

  return (
    <>
        {conversation !== null && <ChatBox/>}
        {body}
    </>
  )
}

export default AdminConversations