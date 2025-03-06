import CheckBox from "../atoms/CheckBox";

export interface ITodoItem {
  id: number;
  title: string;
  completed: boolean;
  columnId: string;
}

interface IProps {
  todo: ITodoItem;
  handleUpdateTodo: (todo: ITodoItem) => void;
}

const TodoItem = ({ todo, handleUpdateTodo }: IProps) => {
  return (
    <li className="flex align-middle items-center my-5" key={todo.id}>
      <CheckBox isCompleted={todo.completed} onChange={() => handleUpdateTodo(todo)} name="updateTodo" />
      <p>{todo.title}</p>
    </li>
  );
};

export default TodoItem;
