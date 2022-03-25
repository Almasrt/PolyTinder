import axios from "axios";
import { useEffect } from "react";
import useState from 'react-hook-use-state';
import { useCookies } from 'react-cookie'
import { API_URL } from "../api";


const MatchesDisplay = ({ matches, setclickedUser }) => {
    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const matchedUserIds = matches.map(({ user_id }) => user_id)
    const userId = cookies.UserId

    const getMatches = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                params: {userIds: JSON.stringify(matchedUserIds)}
            })
            setMatchedProfiles(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [matches])

    const filteredMatchedProfiles = matchedProfiles?.filter((matchedProfile) => matchedProfile.matches.filter((profile) => profile.user_id == userId).length > 0)
    
    return (
        <div className="matches-display">
            {filteredMatchedProfiles?.map((match) => (
                <div key={match.user_id} className="match-card" onClick={() => setclickedUser(match)}>
                    <div className="img-container">
                        <img src={match?.url} alt={match?.first_name + "profile"}/>
                    </div>
                <h3>{match?.first_name}</h3>
                </div>
            ))}
        </div>
    )
}

export default MatchesDisplay;