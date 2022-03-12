import Chat from "./Chat"
import ChatInput from "./ChatInput"
import "../assets/Chat.css"
import "../assets/index.css"

const ChatDisplay = () => {
    return (
        <div>
            <Chat/>
            <ChatInput/>
        </div>
        
    )
}

export default ChatDisplay;