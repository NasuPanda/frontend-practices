type Todo = {
  title: string;
  description: string;
  isDone: boolean;
};

// どちらも { title: string, isDone: boolean }
type PickedTodo = Pick<Todo, 'title' | 'isDone'>;
type OmittedTodo = Omit<Todo, 'description'>;
