import useState from "react-hook-use-state";
import "../assets/BecomePremium.css"
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from 'react-cookie'
import { API_URL } from "../api";

const BecomePremium = () => {

    let navigate = useNavigate()

    const [code, setCode] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const userId = cookies.UserId

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${API_URL}/verify-code`, {params: {code}})
            const success = response.status === 200
            if (success) {
                const foundCode = response.data
                const newUserStatus = foundCode.level
                changeStatus(newUserStatus)
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    const changeStatus = async (newUserStatus) => {
        try {
            const response = await axios.put(`${API_URL}/change-status`, {newUserStatus, userId})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const handleClick = () => {
        navigate('/dashboard')
    }


    return (
        <div className="become-premium">
            <button className="return-button" onClick={handleClick}>Return to Dashboard</button>
            <h1>Become Premium Now</h1>
            <div className="niveaux-abonnement">
                <div id="polytinder">
                    <div className="niveau__header">
                        <h3>PolyTinder</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/14/14165.png" alt="image couronne"/>
                    </div>
                    <div className="niveau__description">
                        <h4>
                            <ul>
                                <li>Swipe without limits</li>
                                <li>Send messages to your matches</li>
                                <li>Get the Instagram and Facebook @ of your matches</li>
                            </ul>
                        </h4>
                    </div>
                </div>
                <div id="polytinder-silver">
                    <div className="niveau__header">
                        <h3>PolyTinder Silver</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/1152/1152912.png" alt="image coupe argent"/>
                    </div>
                    <div className="niveau__description">
                        <h4>
                            <ul>
                                <li>Swipe without limits</li>
                                <li>Send messages to your matches</li>
                                <li>Go back if you swiped left on accident</li>
                            </ul>
                        </h4>
                    </div>
                </div>
                <div id="polytinder-gold">
                    <div className="niveau__header">
                        <h3>PolyTinder Gold</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="image étoile"/>
                    </div>
                    <div className="niveau__description">
                        <h4>
                            <ul>
                                <li>Swipe without limits</li>
                                <li>Send messages to your matches</li>
                                <li>Go back if you swiped left on accident</li>
                                <li>See and match who liked you</li>
                            </ul>
                        </h4>
                    </div>
                </div>
            </div>
                <h2>Enter your Premium Code here : </h2>
                <div className="premium-code-input"> 
                    <form onSubmit={handleSubmit}>
                <section>
                    <input 
                        id="code"
                        type="text"
                        name="code"
                        placeholder="s1545"
                        value={code}
                        onChange={handleChange}/>
                        <input type="submit"/>
                        </section>
                    </form>
                </div>
        </div>
    )
}

export default BecomePremium;