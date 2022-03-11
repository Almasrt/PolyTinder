import "../assets/Nav.css"
import IconButton from '@mui/material/IconButton';

const Nav = ({authToken, setShowModal, showModal}) => {
    const handleClick = () => {
        setShowModal(true)
    }
    return (
    <nav>
        <div className="nav__logo-container">
            POLYTINDER
        </div>

        {!authToken && <IconButton><button 
            className="nav__button" 
            onClick={handleClick}
            disabled={showModal}>Log in</button></IconButton>}
    </nav>
    )
};
 
export default Nav;