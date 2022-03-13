import "../assets/index.css"
import "../assets/Chat.css"
import { useCookies } from 'react-cookie'
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";

const ChatHeader = ({user}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={user.first_name + " profile pic"}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <IconButton><i className="log-out-icon" onClick={logout}><LogoutIcon/></i></IconButton>
        </div>
    )
}

export default ChatHeader;