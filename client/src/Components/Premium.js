import CancelIcon from '@mui/icons-material/Cancel'
import "../assets/Premium.css"
import "../assets/index.css"
import axios from 'axios';
import { useEffect, useState } from 'react';

const Premium = ({setShowPremiumModal, userId}) => {

    const [likers, setLikers] = useState([]);
    const handleClick = () => {
        setShowPremiumModal(false)
    };


    const getLikers = async () => {
        try {
            
          const response = await axios.get('http://localhost:9000/premium-list', {
            params: { userId: userId }
          })
          setLikers(response.data);

        } catch (error) {
          console.log(error)
        }
      }

      

    
      useEffect(() => {
        getLikers()
    },[])

    return (
        <div className="premium-modal">
            <div className="premium-modal__close-icon" 
                onClick={handleClick}><CancelIcon fontSize="medium"/></div>
            <div className="matches-display">
                {likers?.map((match) => (
            <div>{match?.first_name}</div>
        ))}
        </div>
        </div>       
    )

    
}

export default Premium;