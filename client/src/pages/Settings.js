import useState from 'react-hook-use-state';
import Nav from '../Components/Nav';
import "../assets/OnBoarding.css";
import "../assets/index.css";
import "../assets/Home.css"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { API_URL } from "../api";


const Settings = () => {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [user, setUser] = useState(null)
    const [socials, setSocials] = useState(null)
    const [filters, setFilters] = useState(null)
    const [password, setPassword] = useState({
        user_id: cookies.UserId,
        ancient_password: '',
        new_password: ''
    })
    const [error, setError] = useState(null)
    const userId = cookies.UserId
    const authToken = cookies.AuthToken

    const getUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/user`, {
            params: {userId}
          })
          setUser(response.data)

          const response1 = await axios.get(`${API_URL}/user/socials`, {
                params: {userId}
                })
            setSocials(response1.data)

            const response2 = await axios.get(`${API_URL}/user/filters`, {
                params: {userId}
                })
            setFilters(response2.data)
          
        } catch (error) {
          console.log(error)
        }
      }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userAge = getAge()

        user.age = userAge

        try {
            if(password.ancient_password !== '' && password.new_password !== ''){
                const changePassword = await axios.put(`${API_URL}/user/change-password`, {password})
            }
            const response = await axios.put(`${API_URL}/user/update`, {user, socials, filters})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            setError("A problem occured")
            console.log(err)
        }
    }

    const getAge = () => {
        var today = new Date();
        var age = today.getFullYear() - user.dob_year;
        var m = (today.getMonth()+1) - user.dob_month;
        if (m < 0 || (m === 0 && today.getDate() < user.dob_day)) {
            age --;
        }
        return age;
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setUser((prevState) => ({
            ...prevState,
            [name] : value
        }))

    }

    const handleSocialChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        
        setSocials((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleFilterChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        
        setFilters((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    const handlePasswordChange = (e) => {
        setError('')
        const value = e.target.value
        const name = e.target.name
        
        setPassword((prevState) => ({
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
            const response = await axios.delete(`${API_URL}/user/delete`, {
                params : {user_id : user.user_id}
            }) 
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            const success = response.status === 200
            if (success) navigate('/')
        } catch (err) {
            console.log(err)
        }
    }    

    useEffect(() => {
        getUser()
    }, [])
    
    return (
    <div>
        <Nav authToken={authToken} setShowModal={() => {}} showModal={false}/>
      <div className="onboarding">
          <h2>EDIT ACCOUNT</h2>
          <>
          {user && filters && socials &&
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
                        min="01"
                        max="31"
                        placeholder={user.dob_day}
                        value={user.dob_day}
                        onChange={handleChange}/>
                    <input 
                        id="dob_month"
                        type="number"
                        name="dob_month"
                        min="01"
                        max="12"
                        placeholder={user.dob_month}
                        value={user.dob_month}
                        onChange={handleChange}/>
                    <input 
                        id="dob_year"
                        type="number"
                        name="dob_year"
                        min="1960"
                        max="2006"
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
                        <label>Age Filters *</label>
                        <div className="multiple-input-container">
                        <input 
                            id="age_min"
                            type="number"
                            name="age_min"
                            placeholder="age min"
                            min="16"
                            max="100"
                            value={filters.age_min}
                            onChange={handleFilterChange}/>
                        <input 
                            id="age_max"
                            type="number"
                            name="age_max"
                            placeholder="age max"
                            min="16"
                            max="100"
                            value={filters.age_max}
                            onChange={handleFilterChange}/>
                            </div>
                        <label htmlFor="about">About me *</label>
                        <input 
                            id="about"
                            type="text"
                            name="about"
                            maxLength="35"
                            value={user.about}
                            onChange={handleChange}
                            required={true}
                            placeholder="I like playing candy crush..."/>
                        <label>Social Networks</label>
                    <div className="socials-input-container">
                        <div className="social">
                        <img src="https://cdn-icons-png.flaticon.com/512/1936/1936319.png" alt="icone instagram"/>
                        <input 
                            id="insta"
                            type="text"
                            name="insta"
                            placeholder="ex: polycao.mtp"
                            value={socials.insta}
                            onChange={handleSocialChange}/>
                            </div>
                        <div className="social">
                        <img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/facebook_icon_137647.png" alt="icone facebook"/>
                        <input 
                            id="facebook"
                            type="text"
                            name="facebook"
                            placeholder="ex: flibustechBDE2020"
                            value={socials.facebook}
                            onChange={handleSocialChange}/>
                            </div>
                        </div>
                    <input type="submit"/>
              </section>
              <section>
                <label htmlFor="password">Password</label>
                <input 
                            id="ancient-password"
                            type="password"
                            placeholder="ancient password"
                            name="ancient_password"
                            value={password.ancient_password}
                            onChange={handlePasswordChange}/>
                <input 
                            id="new-password"
                            type="password"
                            placeholder="new password"
                            name="new_password"
                            value={password.new_password}
                            onChange={handlePasswordChange}/>
                <label htmlFor="about">Profile photo</label>
                <input 
                            id="url"
                            type="url"
                            name="url"
                            value={user.url}
                            onChange={handleChange}/>
                <h4>{error}</h4>

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