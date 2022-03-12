import "../assets/Nav.css"
import IconButton from '@mui/material/IconButton';

const Nav = ({setShowModal, showModal, setIsSignUp}) => {
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const authToken = true;

    return (
    <nav>
        <div className="nav__logo-container">
            <h3>POLYTINDER</h3>
        <img className="nav__logo"
                src="https://cdn.iconscout.com/icon/free/png-256/tinder-3089510-2567362.png" 
                alt="Tinder logo gris" />
        </div>

        {!authToken && <IconButton><button 
            className="nav__button" 
            onClick={handleClick}
            disabled={showModal}>Log in</button></IconButton>}
    </nav>
    )
};
 
export default Nav;