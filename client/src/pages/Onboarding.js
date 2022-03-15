import useState from 'react-hook-use-state';
import Nav from '../Components/Nav';
import "../assets/OnBoarding.css";
import "../assets/index.css"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Onboarding = () => {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: false,
        gender_identity: 'woman',
        gender_interest: 'woman', 
        url: '',
        about: '',
        age: '',
        age_min: '',
        age_max: '',
        insta: '', 
        snap: '', 
        facebook: '',
        matches: []
    })

    const getAge = () => {
        var today = new Date();
        var age = today.getFullYear() - formData.dob_year;
        var m = today.getMonth() - formData.dob_month;
        
        if (m < 0 || (m === 0 && today.getDate() < formData.dob_day)) {
            age --;
        }
        return age;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userAge = getAge()

        formData.age = userAge

        try {
            const response = await axios.put('http://localhost:9000/user', {formData})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    
    
    return (
        <div>
        <Nav setShowModal={() => {}} showModal={false}/>
      <div className="onboarding">
          <h2>CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
              <section>
                <label htmlFor="first_name">First Name *</label>
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    required={true}
                    value={formData.first_name}
                    onChange={handleChange}/>
                
                <label>Birthday *</label>
                <div className="multiple-input-container">
                    <input 
                        id="dob_day"
                        type="number"
                        name="dob_day"
                        placeholder="DD"
                        required={true}
                        value={formData.dob_day}
                        onChange={handleChange}/>
                    <input 
                        id="dob_month"
                        type="number"
                        name="dob_month"
                        placeholder="MM"
                        required={true}
                        value={formData.dob_month}
                        onChange={handleChange}/>
                    <input 
                        id="dob_year"
                        type="number"
                        name="dob_year"
                        placeholder="YYYY"
                        required={true}
                        value={formData.dob_year}
                        onChange={handleChange}/>
                        </div>
                    <label>Gender *</label>
                    <div className="multiple-input-container">
                        <input 
                            id="woman-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"woman"}
                            onChange={handleChange}
                            checked={formData.gender_identity === 'woman'}/>
                        <label htmlFor="woman-gender-identity">Woman</label>
                        <input 
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"man"}
                            onChange={handleChange}
                            checked={formData.gender_identity === 'man'}/>
                        <label htmlFor="man-gender-identity">Man</label>
                        <input 
                            id="more-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"more"}
                            onChange={handleChange}
                            checked={formData.gender_identity === 'more'}/>
                        <label htmlFor="more-gender-identity">More</label>
                    </div>

                    <label htmlFor="show-gender">Show gender on my profile</label>
                    <input 
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}/>

                    <label>Show me</label>
                    <div className="multiple-input-container">
                        <input 
                            id="woman-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"woman"}
                            onChange={handleChange}
                            checked={formData.gender_interest === 'woman'}/>
                        <label htmlFor="woman-gender-interest">Woman</label>
                        <input 
                            id="man-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"man"}
                            onChange={handleChange}
                            checked={formData.gender_interest === 'man'}/>
                        <label htmlFor="man-gender-interest">Man</label>
                        <input 
                            id="everyone-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value={"everyone"}
                            onChange={handleChange}
                            checked={formData.gender_interest === 'everyone'}/>
                    <label htmlFor="everyone-gender-interest">Everyone</label>
                    </div>
                    <label>Age Filters *</label>
                        <div className="multiple-input-container">
                        <input 
                            id="age_min"
                            type="number"
                            name="age_min"
                            placeholder="age min"
                            value={formData.age_min}
                            onChange={handleChange}/>
                        <input 
                            id="age_max"
                            type="number"
                            name="age_max"
                            placeholder="age max"
                            value={formData.age_max}
                            onChange={handleChange}/>
                            </div>
                    <label htmlFor="about">About me *</label>
                    <input 
                            id="about"
                            type="text"
                            name="about"
                            value={formData.about}
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
                            placeholder="@insta"
                            value={formData.insta}
                            onChange={handleChange}/>
                            </div>
                        <div className="social">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174870.png" alt="icone snapchat"/>
                        <input 
                            id="snap"
                            type="text"
                            name="snap"
                            placeholder="@snap"
                            value={formData.snap}
                            onChange={handleChange}/>
                            </div>
                        <div className="social">
                        <img src="https://cdn-icons.flaticon.com/png/512/665/premium/665209.png?token=exp=1647292707~hmac=80b9af4fab0b8c6c43a88fbd5142dfbd" alt="icone facebook"/>
                        <input 
                            id="facebook"
                            type="text"
                            name="facebook"
                            placeholder="@facebook"
                            value={formData.facebook}
                            onChange={handleChange}/>
                            </div>
                        </div>
                        <input type="submit"/>
              </section>
              <section>
                <label htmlFor="about">Profile photo *</label>
                    <input 
                            id="url"
                            type="url"
                            name="url"
                            onChange={handleChange}
                            required={true}/>

                <div className="photo-container">
                    {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                    </div>
              </section>
          </form>
      </div>
      </div>
    );
  }
  
  export default Onboarding;