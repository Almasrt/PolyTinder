import useState from 'react-hook-use-state';
import Nav from '../Components/Nav';
import "../assets/OnBoarding.css";
import "../assets/index.css"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


const Settings = () => {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [user, setUser] = useState(null)
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
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:9000/userUp', {user})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setUser((prevState) => ({
            ...prevState,
            [name] : value
        }))

    }

    const ConfirmDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete your account ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteAccount()
              },
              {
                label: 'No',
                onClick: () => onclose
              }
            ]
          });
    }
    const deleteAccount = async () => {
        try {
            const response = axios.delete('http://localhost:9000/userDel', {
                params : {user_id : user.user_id}
            }) 
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    

    useEffect(() => {
        getUser()
    }, [])
    
    
    return (
    <div>
        <Nav setShowModal={() => {}} showModal={false}/>
      <div className="onboarding">
          <h2>EDIT ACCOUNT</h2>
          <>
          {user &&
          <form onSubmit={handleSubmit}>
              <section>
                <label htmlFor="first_name">First Name</label>
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder={user.first_name}
                    value={user.first_name}
                    onChange={handleChange}/>
                
                <label>Birthday</label>
                <div className="multiple-input-container">
                    <input 
                        id="dob_day"
                        type="number"
                        name="dob_day"
                        placeholder={user.dob_day}
                        value={user.dob_day}
                        onChange={handleChange}/>
                    <input 
                        id="dob_month"
                        type="number"
                        name="dob_month"
                        placeholder={user.dob_month}
                        value={user.dob_month}
                        onChange={handleChange}/>
                    <input 
                        id="dob_year"
                        type="number"
                        name="dob_year"
                        placeholder={user.dob_year}
                        value={user.dob_year}
                        onChange={handleChange}/>
                        </div>

                    <label>Gender</label>
                    <div className="multiple-input-container">
                        <input 
                            id="woman-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"woman"}
                            onChange={handleChange}
                            checked={user.gender_identity === 'woman'}/>
                        <label htmlFor="woman-gender-identity">Woman</label>
                        <input 
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"man"}
                            onChange={handleChange}
                            checked={user.gender_identity === 'man'}/>
                        <label htmlFor="man-gender-identity">Man</label>
                        <input 
                            id="more-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"more"}
                            onChange={handleChange}
                            checked={user.gender_identity === 'more'}/>
                        <label htmlFor="more-gender-identity">More</label>
                    </div>

                    <label htmlFor="show-gender">Show gender on my profile</label>
                    <input 
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={user.show_gender}/>

                    <label>Show me</label>
                    <div className="multiple-input-container">
                        <input 
                            id="woman-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"woman"}
                            onChange={handleChange}
                            checked={user.gender_interest === 'woman'}/>
                        <label htmlFor="woman-gender-interest">Woman</label>
                        <input 
                            id="man-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"man"}
                            onChange={handleChange}
                            checked={user.gender_interest === 'man'}/>
                        <label htmlFor="man-gender-interest">Man</label>
                        <input 
                            id="everyone-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"everyone"}
                            onChange={handleChange}
                            checked={user.gender_interest === 'everyone'}/>
                        <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>
                        <label>Social Networks</label>
                    <div className="socials-input-container">
                        <div className="social">
                        <img src="https://cdn-icons-png.flaticon.com/512/1936/1936319.png" alt="icone instagram"/>
                        <input 
                            id="insta"
                            type="text"
                            name="insta"
                            placeholder="@insta"
                            value={user.insta}
                            onChange={handleChange}/>
                            </div>
                        <div className="social">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174870.png" alt="icone snapchat"/>
                        <input 
                            id="snap"
                            type="text"
                            name="snap"
                            placeholder="@snap"
                            value={user.snap}
                            onChange={handleChange}/>
                            </div>
                        <div className="social">
                        <img src="https://cdn-icons.flaticon.com/png/512/665/premium/665209.png?token=exp=1647292707~hmac=80b9af4fab0b8c6c43a88fbd5142dfbd" alt="icone facebook"/>
                        <input 
                            id="facebook"
                            type="text"
                            name="facebook"
                            placeholder="@facebook"
                            value={user.facebook}
                            onChange={handleChange}/>
                            </div>
                        </div>
                    <input type="submit"/>
              </section>
              <section>
                <label htmlFor="about">Profile photo</label>
                <input 
                            id="url"
                            type="url"
                            name="url"
                            value={user.url}
                            onChange={handleChange}/>

                <div className="photo-container">
                    {<img src={user.url} alt="profile pic preview"/>}
                    </div>
              </section>
          </form>}
          <div>
            <button className="delete-button" onClick={ConfirmDelete}>Delete Account</button>
          </div>
          </>
      </div>
      </div>
    );
  }
  
  export default Settings;