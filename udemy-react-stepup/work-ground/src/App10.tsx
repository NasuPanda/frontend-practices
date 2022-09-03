import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Task from './Task';
import { TaskType } from './types/task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const onClickFetchData = () => {
    axios
      .get<Array<TaskType>>(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button onClick={onClickFetchData} type="button">
        データ取得
      </button>
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          userId={task.userId}
          completed={task.completed}
        />
      ))}
    </div>
  );
};

export default App;
