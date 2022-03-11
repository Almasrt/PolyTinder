import "../assets/AuthModal.css"
import "../assets/index.css"

const AuthModal = ( {setShowModal}) => {
    const handleClick = () => {
        setShowModal(false)
    }
    return (
      <div className="authmodal">
          <div onClick={handleClick}>x</div>
          AUTHMODAL
      </div>
    );
  }
  
  export default AuthModal;