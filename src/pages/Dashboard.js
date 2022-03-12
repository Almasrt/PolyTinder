import TinderCard from 'react-tinder-card';
import useState from 'react-hook-use-state';
import "../assets/DashBoard.css"
import "../assets/index.css"
import Header from '../Components/Header';
import ChatContainer from "../Components/ChatContainer"


const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://cdn.radiofrance.fr/s3/cruiser-production/2021/11/91ad1ce7-db36-454e-9d42-75d9925f457a/870x489_woodpecker_gettyimages-940391782.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://cdn.radiofrance.fr/s3/cruiser-production/2021/11/91ad1ce7-db36-454e-9d42-75d9925f457a/870x489_woodpecker_gettyimages-940391782.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://cdn.radiofrance.fr/s3/cruiser-production/2021/11/91ad1ce7-db36-454e-9d42-75d9925f457a/870x489_woodpecker_gettyimages-940391782.jpg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://cdn.radiofrance.fr/s3/cruiser-production/2021/11/91ad1ce7-db36-454e-9d42-75d9925f457a/870x489_woodpecker_gettyimages-940391782.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://cdn.radiofrance.fr/s3/cruiser-production/2021/11/91ad1ce7-db36-454e-9d42-75d9925f457a/870x489_woodpecker_gettyimages-940391782.jpg'
    }];

    return (
      <div className="dashboard">
        <Header/>
        <div className="dashboard__swipe-container">
          <div className="dashboard__card-container">
            {characters.map((character) =>
            <TinderCard className='swipe' preventSwipe={["up", "down"]} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          )}              
          <div className="swipe-info">
              {lastDirection ? <p>You swiped {lastDirection} !</p> : <p/>}
          </div>
          </div>

        </div>
      </div>
    );
  }
  
  export default Dashboard;