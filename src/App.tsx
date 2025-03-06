import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, getTodos, updateTodo } from "./services/todoService";
import { ITodoItem } from "./components/molecules/TodoItem";
import { ToastContainer } from "react-toastify";
import TodoList from "./components/organisms/TodoList";
import Button from "./components/atoms/Button";

interface ITodoBody {
  title: string;
  body: string;
  userId: number;
}

function App() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const createTodoBody: ITodoBody = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  }

  const handleUpdateTodo = async (todo: ITodoItem) => {
    const updatedTodo = await updateTodo({ ...todo, completed: !todo.completed });
    return updatedTodo;
  };

  const updateTodoMutation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: handleUpdateTodo,
    onSuccess: async (updatedTodo: ITodoItem) => {
      await queryClient.setQueryData(["todos"], (old: ITodoItem[] = []) =>
        old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );
    },
  });

  const handleCreateTodoMutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
    onSuccess: async (createdTodo: ITodoItem) => {
      await queryClient.setQueryData(["todos"], (old: ITodoItem[] = []) => [
        ...old,
        createdTodo
      ]
      );
    }
  })

  return (
    <div className="min-h-full">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-purple-700 table mr-4">
            Your Todo app
          </h1>
          <Button buttonType="button" text="Add a new todo" onClick={() => handleCreateTodoMutation.mutate(createTodoBody)} />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 border-b-4 border-purple-700 table">
            To Do
          </h2>
          {query.data && <TodoList todos={query.data.filter((todo: ITodoItem) => !todo.completed)} handleUpdateTodo={(todo: ITodoItem) => updateTodoMutation.mutate(todo)} allCompletedMessage="All todo's have been completed" />}
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 border-purple-700 border-b-4 table">
            Completed
          </h2>
          {query.data && <TodoList todos={query.data.filter((todo: ITodoItem) => todo.completed)} handleUpdateTodo={(todo: ITodoItem) => updateTodoMutation.mutate(todo)} allCompletedMessage="Completed todo's is empty" />}
        </div>
        <ToastContainer position="bottom-right" />
      </main>
    </div>
  );
}

export default App;
