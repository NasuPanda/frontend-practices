import React, {useState, useEffect} from 'react';

const Counter = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(prevState => prevState + 1)
  }
  const countDown = () => {
    setCount(prevState => prevState - 1)
  }

  useEffect(() => {
    console.log("current count is", count)
  })

  return (
    <div>
      <p>カウント数: {count}</p>
      <button onClick={countUp}>up</button>
      <button onClick={countDown}>down</button>
    </div>
  )
}

export default Counter
