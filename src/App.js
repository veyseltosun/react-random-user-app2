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

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      try {
        setTitle(newValue);
        setValue(user[newValue]);
      } catch (error) {
        console.log(error);
      }
    }

  }

  const addUser = () => {
    setUserArray([...userArray, user]);
  }
  return (
    <div>

      <div className='block bcg-orange'>
        <img src={cwSvg} alt="cw" id='cw' />

      </div>
      <div className='block'>
        <div className='container'>
          <img src={(user && user.image) || defaultImage} alt="random user" className="user-img" />
          <p className='user-title'>My {title}</p>
          <p className='user-value'>{value}</p>
          <div className="values-list">
            <button
              className='icon'
              data-label="name"
              onMouseOver={handleValue}

            >
              <img src={user?.gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg" />
            </button>

            <button
              className='icon'
              data-label="email"
              onMouseOver={handleValue}

            >
              <img src={mailSvg}
                alt="email"
                id="iconImg" />
            </button>


            <button
              className='icon'
              data-label="age"
              onMouseOver={handleValue}

            >
              <img src={user?.gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg" />
            </button>

            <button
              className='icon'
              data-label="street"
              onMouseOver={handleValue}

            >
              <img src={mapSvg}
                alt="street"
                id="iconImg" />
            </button>

            <button
              className='icon'
              data-label="phone"
              onMouseOver={handleValue}

            >
              <img src={phoneSvg}
                alt="phone"
                id="iconImg" />
            </button>

            <button
              className='icon'
              data-label="password"
              onMouseOver={handleValue}

            >
              <img src={padlockSvg}
                alt="lock"
                id="iconImg" />
            </button>


          </div>
          <div className='btn-group'>
            <button className='btn' type='button' onClick={getUser}>
              {loading? "loading" : "new user"}
            </button>
            <button className='btn' type='button' onClick={addUser}>
              add user
            </button>
          </div>

          {userArray.length === 0 ? null : (
            <table className='table'>
              <thead>
                <tr className='head-tr'>
                  <th className='th'>Firtname</th>
                  <th className='th'>Email</th>
                  <th className='th'>Phone</th>
                  <th className='th'>Age</th>
                </tr>
              </thead>
              <tbody>
                {userArray.map((item,index) =>(
                  <tr key={index} className="body-tr">
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.age}</td>
                  </tr>
                ) )}
              </tbody>
            </table>
          )}



        </div>

      </div>


      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
