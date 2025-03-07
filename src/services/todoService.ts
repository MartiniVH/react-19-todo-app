import { toast } from "react-toastify";
import { ITodoItem } from "../components/molecules/TodoItem";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos?_limit=5`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  const data = await response.json();
  return data;
};

export const createTodo = async (todo: ITodoItem) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      title: todo.title,
      completed: false,
      userId: 1,
    }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  const data = await response.json();
  return data;
};

export const updateTodo = async (todo: ITodoItem) => {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) throw new Error("Failed to update todo");
  toast("Todo updated");
  return await response.json();
};

export const deleteTodo = async (todoId: number) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
};
