import useState from 'react-hook-use-state';
import "../assets/Chat.css"

const ChatInput = () => {
    const [textarea, setTextArea] = useState(null);
    return (
        <div className="chat-input">
            <textarea value={""} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="home__button">Submit</button>
        </div>
        
    )
}

export default ChatInput;