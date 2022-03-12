import Nav from "../Components/Nav"
import "../assets/Home.css"
import "../assets/index.css"
import useState from 'react-hook-use-state';
import AuthModal from "../Components/AuthModal";
import IconButton from '@mui/material/IconButton';

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const authToken = false;
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);
    };
    return (
        <div className="overlay">
            <Nav setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
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