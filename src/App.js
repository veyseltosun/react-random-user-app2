import { useState, useEffect } from 'react';
import Footer from "./components/Footer"
import axios from 'axios';
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";

const url = "https://randomuser.me/api/"
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

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

      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
