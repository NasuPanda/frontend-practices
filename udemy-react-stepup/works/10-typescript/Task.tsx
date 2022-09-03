import { TaskType } from './types/task';

const Todo: React.VFC<Pick<TaskType, 'userId' | 'title' | 'completed'>> = ({
  title,
  userId,
  completed = false,
}) => {
  const completeMark = completed ? '[完]' : '[未]';

  return <p>{`${completeMark} ${title} (ユーザ: ${userId})`}</p>;
};

export default Todo;
