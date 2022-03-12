import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MatchesDisplay"
import "../assets/ChatContainer.css"
import "../assets/index.css"

const ChatContainer = () => {
    return <div className="chat-container">
        <ChatHeader/>

        <div>
            <button className="option">Matches</button>
            <button className="option">Chat</button>
        </div>

        <MatchesDisplay/>

        <ChatDisplay/>
    </div>
}

export default ChatContainer;