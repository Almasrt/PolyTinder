import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MatchesDisplay"
import "../assets/Chat.css"
import "../assets/index.css"
import useState from "react-hook-use-state"

const ChatContainer = ( {user} ) => {
    const [clickedUser, setclickedUser] = useState(null)
    return <div className="chat-container">
        <ChatHeader user = {user}/>
        <div>
            <button className="option" onClick={() => setclickedUser(null)}>Matches</button>
            <button className="option" disabled={!clickedUser}>Chat</button>
        </div>

        {!clickedUser &&<MatchesDisplay matches={user.matches} setclickedUser={setclickedUser}/>}

        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
}

export default ChatContainer;