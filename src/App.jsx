import React, { useState } from "react";
import { useTheme } from "./theme-context";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, isCompleted: false, isEditing: false }]);
    setNewTodo("");
  };

  // Delete a todo
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Toggle todo completion
  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // Enable todo editing
  const editTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = !newTodos[index].isEditing;
    setTodos(newTodos);
  };

  // Update todo text
  const updateTodoText = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  // Save edited todo
  const saveTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Todo List</h1>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Add Todo Input */}
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
       {/* Todo List */}
       <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.isCompleted ? "completed" : ""} ${theme === "dark" ? "dark-todo" : ""}`}
          >
            {todo.isEditing ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => updateTodoText(index, e.target.value)}
                className={theme === "dark" ? "dark-input" : ""}
              />
            ) : (
              <span className={theme === "dark" ? "dark-text" : "light-text"}>
                {todo.text}
              </span>
            )}

            <div className="todo-actions">
              <button onClick={() => toggleComplete(index)}>
                {todo.isCompleted ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
              {todo.isEditing ? (
                <button onClick={() => saveTodo(index)}>Save</button>
              ) : (
                <button onClick={() => editTodo(index)}>Edit</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;