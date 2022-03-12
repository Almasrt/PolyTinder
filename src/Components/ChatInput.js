import useState from 'react-hook-use-state';
import "../assets/Nav.css"

const Chat = () => {
    const [textarea, setTextArea] = useState(null);
    return (
        <div className="chat-input">
            <textarea value={""} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="nav__button" >Submit</button>
        </div>
        
    )
}

export default Chat;