import Chat from "./Chat"
import ChatInput from "./ChatInput"
import "../assets/Chat.css"
import "../assets/index.css"
import axios from "axios"
import useState from "react-hook-use-state"
import { useEffect } from "react"

const ChatDisplay = ({user, clickedUser}) => {
    const [usersMessages, setUsersMessages] = useState(null)
    const userId = user?.user_id
    const clickedUserId = clickedUser.user_id
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)
    const [socials, setSocials] = useState([])

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:9000/messages', {
            params: {userId: userId, correspondingUserId: clickedUserId}
        })
        setUsersMessages(response.data)
        } catch (error) {
        console.log(error)
        }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:9000/messages', {
            params: {userId: clickedUserId, correspondingUserId: userId}
        })
        setClickedUsersMessages(response.data)
        } catch (error) {
        console.log(error)
        }
    }

    const getSocials = async  () => {
        try {
            console.log(userId)
            const response1 = await axios.get('http://localhost:9000/socials', {
              params: {userId: clickedUserId}
            })
            setSocials(response1.data)
        } catch (error) {
            console.log(error)
            }
    }

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
        getSocials()
    }, [])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message?.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message?.timestamp
        messages.push(formattedMessage)
    })
    
    const descendingOrderMessages = messages.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <div>
            <div className="card__icons">
              <a href={'https://www.instagram.com/' + socials.insta +'/?hl=fr'}><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="icone instagram"/></a>
              <a href={'https://www.facebook.com/' + socials.facebook}><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="icone facebook"/></a> 
              </div>
            <Chat descendingOrderMessages={descendingOrderMessages}/>
            <ChatInput user={user} clickedUser={clickedUser} getUsersMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages}/>
        </div>
        
    )
}

export default ChatDisplay;