import { useContext } from "react"
import { ChatContext } from "../../contexts/ChatContext"
import chatIcon from '../../assets/chat.svg'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip  from 'react-bootstrap/Tooltip'

const Chat = () =>
{
  const { loadConversation, setShowChat } = useContext(ChatContext)

  const chat = () => {
    loadConversation()
    setShowChat(true)
  }

  return (
    <OverlayTrigger placement='left' overlay={<Tooltip>Chat with Admin</Tooltip>}>
        <Button className='btn-floating' onClick={chat}>
            <img src={chatIcon} alt="add product" witdh='60' height='60'/>
        </Button>
    </OverlayTrigger>
  )
}

export default Chat


                    

