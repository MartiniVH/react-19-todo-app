import TodoItem, { ITodoItem } from "../molecules/TodoItem";

interface IProps {
    todos: ITodoItem[];
    handleUpdateTodo: (todo: ITodoItem) => void;
    allCompletedMessage: string;
}

const TodoList = ({ todos, handleUpdateTodo, allCompletedMessage }: IProps) => {
    if (todos && todos.length <= 0) {
        return <p className="mt-4">{allCompletedMessage}</p>
    }

    return todos.map((todo: ITodoItem) => {
        return <TodoItem key={todo.id} todo={todo} handleUpdateTodo={(todo: ITodoItem) => handleUpdateTodo(todo)} />
    })
}

export default TodoList;
