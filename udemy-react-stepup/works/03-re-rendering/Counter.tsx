import React, { VFC, useState } from 'react';

const App: VFC = () => {
  const [count, setCount] = useState(0);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);

  return (
    <div className="Counter">
      <h1>Test Counter</h1>

      <p>{count}</p>
      <button onClick={increment} type="button">
        +1
      </button>
      <button onClick={decrement} type="button">
        -1
      </button>
    </div>
  );
};

export default App;
