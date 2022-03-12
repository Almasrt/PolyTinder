import useState from 'react-hook-use-state';
import Nav from '../Components/Nav';

const Onboarding = () => {

    const handleSubmit = () => {
        console.log("submitted")
    }

    const handleChange = () => {
        console.log("changed")
    }
    
    
    return (
        <div>
        <Nav setShowModal={() => {}} showModal={false}/>
      <div className="onboarding">
          <h2>CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
              <section>
                <label htmlFor="first_name">First Name</label>
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    required={true}
                    value={""}
                    onChange={handleChange}/>
                
                <label>Birthday</label>
                <div className="multiple-input-container">
                    <input 
                        id="dob_day"
                        type="number"
                        name="dob_day"
                        placeholder="DD"
                        required={true}
                        value={""}
                        onChange={handleChange}/>
                    <input 
                        id="dob_month"
                        type="number"
                        name="dob_month"
                        placeholder="MM"
                        required={true}
                        value={""}
                        onChange={handleChange}/>
                    <input 
                        id="dob_year"
                        type="number"
                        name="dob_year"
                        placeholder="YYYY"
                        required={true}
                        value={""}
                        onChange={handleChange}/></div>

                    <label>Gender</label>
                    <div className="multiple-input-container">
                        <input 
                            id="woman-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"woman"}
                            onChange={handleChange}
                            checked={false}/>
                        <label htmlFor="woman-gender-identity">Woman</label>
                        <input 
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"man"}
                            onChange={handleChange}
                            checked={false}/>
                        <label htmlFor="man-gender-identity">Man</label>
                        <input 
                            id="more-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value={"more"}
                            onChange={handleChange}
                            checked={false}/>
                        <label htmlFor="more-gender-identity">More</label>
                    </div>

                    <label htmlFor="show-gender">Show gender on my profile</label>
                    <input 
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            value={"more"}
                            onChange={handleChange}
                            checked={false}/>
              </section>
          </form>
      </div>
      </div>
    );
  }
  
  export default Onboarding;