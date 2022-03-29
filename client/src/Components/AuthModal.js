import "../assets/AuthModal.css"
import "../assets/index.css"
import axios from 'axios';
import useState from 'react-hook-use-state';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { API_URL } from "../api";

const AuthModal = ( {setShowModal, isSignUp}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false)
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError("")
            if(isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match')
                return 
            }
            
            const response = await axios.post(`${API_URL}/user/${isSignUp ? 'signup' : 'login'}`, {email, password})
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201;

            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')


            window.location.reload()
            
        } catch (error) {
            setError("A problem has occured")
            console.log(error)
        }
    };

    return (
      <div className="authmodal">
          <div className="authmodal__close-icon" 
            onClick={handleClick}><CancelIcon fontSize="medium"/></div>
          <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
          <form onSubmit={handleSubmit}>
            <input 
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}/>
            <input 
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}/>
            {isSignUp && <input 
                type="password"
                id="password-check"
                name="password-check"
                placeholder="confirm password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}/>}
            <input className="authmodal__form-button" type="submit"/>
            <p>{error}</p>
          </form>
          
      </div>
    );
  }
  
  export default AuthModal;