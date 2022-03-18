import TinderCard from 'react-tinder-card';
import useState from 'react-hook-use-state';
import "../assets/DashBoard.css"
import "../assets/BecomePremium.css"
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
  const [code, setCode] = useState("")
  const [error, setError] = useState(null)
  const [ageFilteredUsers, setAgeFilteredUsers] = useState([])

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


  const getAgeFilteredUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/age-filters', {
        params: {userId: userId}
      })

      setAgeFilteredUsers(response.data)
      
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
      getAgeFilteredUsers()
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

  const handleBecomePremiumClick = () => {
    navigate('/become-premium')
  }
  
  


  const matchedUserIds = user?.matches.map(({user_id}) => user_id)
  const ageFilteredUsersId = ageFilteredUsers?.map(({user_id}) => user_id)
  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )

  const totalyFilteredUsers = filteredGenderedUsers?.filter(
    genderedUser => ageFilteredUsersId.includes(genderedUser.user_id)
  )

  console.log(filteredGenderedUsers)
  console.log(totalyFilteredUsers)
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

    const handleNewCodeSubmit = async (e) => {
      e.preventDefault()
      try {
          setError("")
          const response = await axios.post('http://localhost:9000/new-code', {code})
          const success = response.status === 200
          if(success) setCode('')
      } catch (err) {
          setError('A problem has occured')
          console.log(err)
      }
  }

  const handleNewCodeChange = (e) => {
    setCode(e.target.value)
}
    
    return (
      <>
    {user && totalyFilteredUsers &&
    <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="settings-button">
          <SettingsIcon onClick={handleClick}/>
          {user.status === "gold" && <StarBorderIcon onClick={handlePremiumClick}/>}
        </div>
      <div className="dashboard__swipe-container">
        <div className="dashboard__card-container">
        {showPremiumModal && <div className="premium-modal">
          <Premium setShowPremiumModal={setShowPremiumModal} userId={userId}/>
          </div>}
          
          <div> {totalyFilteredUsers?.map((genderedUser) =>
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
        {user.status !== "basic" &&  <KeyboardReturnIcon onClick={handleReturnClick} className="return-button"/> }
        </div>
        </div>

      </div>
    </div>}
    {user && user.status !== "gold" && <div className="to-become-premium" onClick={handleBecomePremiumClick}>
        <h3>
          Click Here to Become Premium
        </h3>
      </div>}
      {user && user.user_id === "a5ed3d2d-7603-45ea-9b6e-6bb11a3e42b0" && <div className="add-premium-code">
        <h3>
          Add a Premium Code :
        </h3>
        <div className="become-premium"> 
            <form onSubmit={handleNewCodeSubmit}>
            <section>
                <input 
                    id="code"
                    type="text"
                    name="code"
                    placeholder="s1545"
                    value={code}
                    onChange={handleNewCodeChange}/>
                    <input type="submit"/>
                    </section>
                </form>
            </div>
            <h3>{error}</h3>
      </div>}
    </>
  );
}
  
  export default Dashboard;