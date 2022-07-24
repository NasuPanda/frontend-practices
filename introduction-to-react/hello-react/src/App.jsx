import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [id, setId] = useState('google')
  const [name, setName] = useState('')
  const ids = ['aws', 'google', 'facebook', 'deatiger', 'gaearon']
  const getRandomId = () => {
    const _id = ids[Math.floor(Math.random * ids.length)]
    setId(_id)
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setName(data.name)
      })
      .catch(error => { console.log(error) })
  }, [id])
  return (
    <div>
      <p>{id}, {name}</p>
      <button onClick={getRandomId}>ID変更</button>
    </div>
  );
}
export default App;
