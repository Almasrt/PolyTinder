import axios from 'axios';
import useState from 'react-hook-use-state';
import "../assets/Chat.css"

const ChatInput = ({user, clickedUser, getUsersMessages, getClickedUsersMessages}) => {
    const [textArea, setTextArea] = useState("");
    const userId = user?.user_id
    const clickedUserId = clickedUser.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }
        try {
            await axios.post('http://localhost:9000/message', { message })
            getUsersMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="home__button" onClick={addMessage}>Submit</button>
        </div>
        
    )
}

export default ChatInput;