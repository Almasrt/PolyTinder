import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MatchesDisplay"
import "../assets/Chat.css"
import "../assets/index.css"

const ChatContainer = ( {user} ) => {
    return <div className="chat-container">
        <ChatHeader user = {user}/>
        <div>
            <button className="option">Matches</button>
            <button className="option">Chat</button>
        </div>

        <MatchesDisplay matches={user.matches}/>

        <ChatDisplay/>
    </div>
}

export default ChatContainer;