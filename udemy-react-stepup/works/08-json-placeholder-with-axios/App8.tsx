import './App.css';
import axios from 'axios';

const App: React.FC = () => {
  const onClickUsers = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  const onClickUser1 = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button type="button" onClick={onClickUsers}>
        Users
      </button>
      <button type="button" onClick={onClickUser1}>
        User1
      </button>
    </div>
  );
};

export default App;
