import { useState, useEffect } from 'react';
import axios from 'axios';

const url = "https://randomuser.me/api/"
function App() {

  const [user, setUser] = useState(null);

  const getUser = () => {
    axios.get(url).then(function (response) {
      console.log(response.data.results);
      setUser(response.data.results)
    })
  }


  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
      {user?.map((person, index) => {
        return(
          <div className='user-container' key={index}>
            <div className='header-container'>
              <img src={person.picture.large} alt="person pic"/>
              <p className="header-title" >{person.name.first} {person.name.last}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
