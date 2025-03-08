import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newtodo.trim() === "") return;
    setTodos([...todos, { text: newtodo, isCompleted: false, isEditing: false }]);
    setNewTodo("");
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = !newTodos[index].isEditing;
    setTodos(newTodos);
  };

  const updateTodoText = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const saveTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a todo..."
          value={newtodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className="w-80 bg-white p-4 rounded-lg shadow">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            {todo.isEditing ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={todo.text}
                onChange={(e) => updateTodoText(index, e.target.value)}
              />
            ) : (
              <span className={`flex-1 ${todo.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}>
                {todo.text}
              </span>
            )}

            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => toggleComplete(index)}
              >
                {todo.isCompleted ? "Undo" : "Complete"}
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
              {todo.isEditing ? (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => saveTodo(index)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => editTodo(index)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;