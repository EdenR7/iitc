import React, { useState } from "react";

const INITIAL_TODOS = [
  { id: "1", title: "Learn React", isComplete: false },
  { id: "2", title: "Build a Todo App", isComplete: false },
  { id: "3", title: "Read JavaScript Documentation", isComplete: true },
  { id: "4", title: "Write Unit Tests", isComplete: false },
  { id: "5", title: "Implement Context", isComplete: true },
  { id: "6", title: "Create Portfolio Website", isComplete: false },
  { id: "7", title: "Learn TypeScript", isComplete: false },
  { id: "8", title: "Refactor Codebase", isComplete: true },
  { id: "9", title: "Optimize Performance", isComplete: false },
  { id: "10", title: "Deploy to Production", isComplete: true },
];
function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function Todos() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");

  const totalTodos = todos.length;
  const completedTodos = todos.reduce((acc, todo) => {
    if (todo.isComplete) acc += 1;
    return acc;
  }, 0);
  const activeTodos = totalTodos - completedTodos;

  function updateIsComplete(todoID) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoID) {
        return {
          ...todo,
          isComplete: todo.isComplete ? false : true,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function handleNewTodoChange(event) {
    event.preventDefault();
    setNewTodo(event.target.value);
  }

  function addNewTodo(event) {
    if (!newTodo) return;
    event.preventDefault();
    const todoToAdd = {
      id: makeId,
      title: newTodo,
      isComplete: false,
    };
    const updatedTodos = [...todos, todoToAdd];
    setTodos(updatedTodos);
    setNewTodo("");
  }

  function removeTodo(id) {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  }

  function calculateProgress() {
    return (completedTodos / totalTodos) * 100;
  }

  return (
    <>
      <h1>Todos</h1>
      <form
        onSubmit={(event) => {
          addNewTodo(event);
        }}
        className="flex-group new-todo-form"
      >
        <input
          onChange={(event) => {
            handleNewTodoChange(event);
          }}
          value={newTodo}
          id="new-todo-name"
          type="text"
          placeholder="New Todo ..."
        />
        <button className="btn" type="submit">
          Add New Todo
        </button>
      </form>
      <div className="flex-group statistics-container">
        <progress
          id="progress"
          value={calculateProgress()}
          max="100"
        ></progress>
        <div className="statistics flex-group">
          <h4 className="statistics__total">{totalTodos} Tasks</h4>
          <p className="statistics__completed">{completedTodos} completed</p>
          <p className="statistics__active">{activeTodos} active todos</p>
        </div>
      </div>
      {todos.length === 0 ? <p>"No todos available"</p> : null}
      <ul className="">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="todo-container flex-group">
              <input
                className="checkbox"
                onChange={() => {
                  updateIsComplete(todo.id);
                }}
                type="checkbox"
                name="check-input"
                checked={todo.isComplete}
              />
              <h3
                className={`${todo.isComplete ? "completed" : ""} todo-title`}
              >
                {todo.title}
              </h3>
              <button
                onClick={() => {
                  removeTodo(todo.id);
                }}
                className="btn remove-todo"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Todos;
