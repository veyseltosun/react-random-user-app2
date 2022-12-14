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

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("random user");
  const [title, setTitle] = useState("name")
  const [userArray, setUserArray] = useState([]);


  async function getUser() {
    setLoading(true)
    try {
      const response = await axios.get(url);
      console.log(response);
      // setUser(response.data.results)
      const user = response.data.results[0]
      const { phone, email, gender } = user;
      const { large: image } = user.picture;
      const { password } = user.login;
      const { first, last } = user.name;
      const { dob: { age }, } = user;
      const { street: { number, name }, } = user.location;
      const newUser = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
        gender,
      };

      setUser(newUser)
      setLoading(false)
      setTitle("name");
      setValue(newUser.name);

    } catch (error) {
      console.error(error);
    }
  }


  // const getUser = () => {
  //   axios.get(url).then(function (response) {
  //     console.log(response.data.results);
  //     setUser(response.data.results)
  //   })
  // }


  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">

      <div className='block bcg-orange'>
        <img src={cwSvg} alt="cw" id='cw' />
       
      </div>
      <div className='block'>
        <div className='container'>
          <img src={(user && user.image ) || defaultImage} className="user-img"/>

        </div>

      </div>


      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
