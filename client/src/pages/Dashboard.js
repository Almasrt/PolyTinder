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
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState()
  const [user, setUser] = useState(null)
  const [lastUser, setLastUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [goBack, setgoBack] = useState(false)

  let navigate = useNavigate()
  

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
    console.log(lastUser)
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
  
  


  const matchedUserIds = user?.matches.map(({user_id}) => user_id)
  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )
    const handleReturnClick = () => {
      if(lastUser !== null){
        if(lastDirection === 'left'){
          setgoBack(true)
        }
      }
      else{
      }
    }

    const handlePremiumClick = () => {
      setShowPremiumModal(true)
    }
    
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
          
          <div> {filteredGenderedUsers?.map((genderedUser) =>
          <TinderCard className='swipe' preventSwipe={["up", "down"]} key={genderedUser.user_id} onSwipe={(dir) => swiped(dir, genderedUser.user_id)} onCardLeftScreen={() => setLastUser(genderedUser)}>
            <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className='card'>
              <h3>{genderedUser.first_name}</h3>
            </div>
          </TinderCard>
        )}
        </div>
        {goBack && <TinderCard className='swipe' preventSwipe={["up", "down"]} key={lastUser?.user_id} onSwipe={(dir) => swiped(dir, lastUser?.user_id)} onCardLeftScreen={() => setgoBack(false)}>
            <div style={{ backgroundImage: 'url(' + lastUser?.url + ')' }} className='card'>
              <h3>{lastUser?.first_name}</h3>
            </div>
          </TinderCard>}
          
        <div className="swipe-info">
        {user.isPremium && <KeyboardReturnIcon onClick={handleReturnClick} className="return-button"/> }
            {lastDirection ? <p>You swiped {lastDirection} !</p> : <p/>}
        </div>
        </div>

      </div>
    </div>}
    </>
  );
}
  
  export default Dashboard;