import "../assets/Nav.css"
import IconButton from '@mui/material/IconButton';

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp}) => {
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
    <nav>
        <div className="nav__logo-container">
            <h3>POLYTINDER</h3>
        <img className="nav__logo"
                src="https://cdn.iconscout.com/icon/free/png-256/tinder-3089510-2567362.png" 
                alt="Tinder logo" />
        </div>

        {!authToken && <IconButton onClick={handleClick} disabled={showModal}><div 
            className="nav__button" style={showModal? {opacity: 0.4}:null}>Log in</div></IconButton>}
    </nav>
    )
};
 
export default Nav;