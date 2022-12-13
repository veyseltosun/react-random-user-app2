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
      
    </div>
  );
}

export default App;
