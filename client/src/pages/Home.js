import Nav from "../Components/Nav"
import "../assets/Home.css"
import "../assets/index.css"
import useState from 'react-hook-use-state';
import AuthModal from "../Components/AuthModal";
import IconButton from '@mui/material/IconButton';
import { useCookies } from 'react-cookie'

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const authToken = cookies.AuthToken
    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true);
        setIsSignUp(true);
    };
    return (
        <div className="overlay">
            <Nav authToken={authToken} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className="home__title">The Best Tinder</h1>
                <IconButton size='large'><button className="home__button" onClick={handleClick} disabled={showModal}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button></IconButton>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    );
  }
  
  export default Home;