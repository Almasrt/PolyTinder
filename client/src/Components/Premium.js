import CancelIcon from '@mui/icons-material/Cancel'
import "../assets/Premium.css"
import "../assets/index.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from "../api";
import TinderCard from 'react-tinder-card';

const Premium = ({setShowPremiumModal, userId}) => {

    const [likers, setLikers] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [lastUser, setLastUser] = useState(null)
    const [socials, setSocials] = useState([])

    const handleClick = () => {
        setShowPremiumModal(false)
    };

    const swiped = (direction, swipedUser) => {
    
      if (direction === 'right') {
        updateMatches(swipedUser)
      }
      setLastDirection(direction)
    }

    const updateMatches = async (matchedUser) => {
      try {
        const matchedUserId = matchedUser.user_id
        axios.put(`${API_URL}/user/addmatch`, {
          userId, 
          matchedUserId
        });
      } catch (error) {
        console.log(error)
      }
    }


    const getLikers = async () => {
        try {
          const response1 = await axios.get(`${API_URL}/user/socials`, {
            params: {userId}
          })
          setSocials(response1.data)

          const response = await axios.get(`${API_URL}/user/premium-list`, {
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
          <CancelIcon className="close_icon" onClick={handleClick} fontSize="medium"/>
          <div className="all-modal">
            <div className="premium-matches-display">
              <h2>Your secret fans</h2>
                {likers?.map((match) => (
            <TinderCard className='swipe' preventSwipe={["up", "down"]} key={match.user_id} onSwipe={(dir) => swiped(dir, match)} onCardLeftScreen={() => setLastUser(match)}>
            <div style={{ backgroundImage: 'url(' + match.url + ')' }} className='card'>
              <h3>{match.first_name}</h3>
              <h4>{match.age}</h4>
              <h5>{match.about}</h5>
            </div>
          </TinderCard>
        ))}
          </div>
        </div>
        </div>       
    )

    
}

export default Premium;