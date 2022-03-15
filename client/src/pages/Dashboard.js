import TinderCard from 'react-tinder-card';
import useState from 'react-hook-use-state';
import "../assets/DashBoard.css"
import "../assets/index.css"
import SettingsIcon from '@mui/icons-material/Settings';
import ChatContainer from "../Components/ChatContainer"
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Premium from '../Components/Premium';


const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState()
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  let navigate = useNavigate()

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:9000/user', {
        params: {userId}
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/gendered-users', {
        params: { gender: user?.gender_interest, userId: userId }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      getUser()
  }, [])

  useEffect(() => {
    if (user) {
      getGenderedUsers()
    }
  }, [user])


  const updateMatches = async (matchedUserId) => {
    try {
      axios.put('http://localhost:9000/addmatch', {
        userId, 
        matchedUserId
      });
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  const swiped = (direction, swipedUserId) => {
    
    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const handleClick = () => {
    navigate('/settings')
  }
  
  const handlePremiumClick = () => {
    setShowPremiumModal(true);
  }


  const matchedUserIds = user?.matches.map(({user_id}) => user_id)
  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )
    
    
    return (
      <>
    {user && filteredGenderedUsers &&
    <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="settings-button">
          <SettingsIcon onClick={handleClick}/>
          <StarBorderIcon onClick={handlePremiumClick}/>
        </div>
      <div className="dashboard__swipe-container">
        <div className="dashboard__card-container">
        {showPremiumModal && <div className="premium-modal">
          <Premium setShowPremiumModal={setShowPremiumModal} userId={userId}/>
          </div>}
          {filteredGenderedUsers?.map((genderedUser) =>
          <TinderCard className='swipe' preventSwipe={["up", "down"]} key={genderedUser.user_id} onSwipe={(dir) => swiped(dir, genderedUser.user_id)} onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
            <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className='card'>
              <h3>{genderedUser.first_name}</h3>
            </div>
          </TinderCard>
        )}              
        <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection} !</p> : <p/>}
        </div>
        </div>

      </div>
    </div>}
    </>
  );
}
  
  export default Dashboard;