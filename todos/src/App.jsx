import React, { useEffect, useState, useRef } from "react";
import TodoStatistics from "./app_components/todoStatistics";
import { TodoList } from "./app_components/todoList";
import AddTodoForm from "./app_components/addTodoForm";
import FilterTodos from "./app_components/filterTodos";
const todosUrl = "http://localhost:8001/todos";

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

function App() {
  // STATES
  const [todos, setTodos] = useState([]); //All todos state
  const [newTodo, setNewTodo] = useState(""); // Add new todo input state
  const [newFilterInput, setNewFilterInput] = useState(""); // Filter search input state
  const [filterOnActive, setFilterOnActive] = useState(false); // State for filter by active
  const [filterOnComplete, setFilterOnComplete] = useState(false); // State for filter by complete

  //USE_REFS
  const newTodoInputRef = useRef(null);
  let newTodoTitleRef = useRef(""); // ex7-Wasnt sure what to do
  const filterTodoInputRef = useRef(null);
  const timeoutRef = useRef(null);

  //DERIVED STATES
  const totalTodos = todos.length;
  const completedTodos = todos.reduce((acc, todo) => {
    if (todo.isComplete) acc += 1;
    return acc;
  }, 0);
  const activeTodos = totalTodos - completedTodos;

  const filteredItems = // Those lines are filtered the todos
    !filterOnActive && !filterOnComplete //The default, as long as the user didnt press one of the filters buttons
      ? todos.filter((todo) =>
          todo.title
            .toLocaleLowerCase()
            .includes(newFilterInput.toLocaleLowerCase())
        )
      : filterOnActive // if the user press one of the options it will check which button pressed
      ? todos.filter((todo) => !todo.isComplete)
      : todos.filter((todo) => todo.isComplete);

  //Initialize the todos
  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    const response = await fetch(todosUrl);
    const updatedTodos = await response.json();
    setTodos(updatedTodos);
  }

  //ONLY SERVER CRUD
  async function updateTodoStatusOnServer(todo, newStatus) {
    const res = await fetch(`${todosUrl}/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, isComplete: newStatus }),
    });
  }
  async function addNewTodoToServer(newTodo) {
    try {
      await fetch(todosUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTodo }),
      });
    } catch (error) {}
  }
  async function removeTodoFromServer(todoId) {
    try {
      await fetch(`${todosUrl}/${todoId}`, {
        method: "DELETE",
      });
    } catch (error) {}
  }
  //SERVER AND LOCAL CRUD
  async function updateIsComplete(todoID) {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoID) {
          try {
            updateTodoStatusOnServer(
              todo,
              todo.isComplete ? false : true
            ).then();
          } catch (error) {
            throw error;
          }
          return {
            ...todo,
            isComplete: todo.isComplete ? false : true,
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  }
  function handleNewTodoChange(event) {
    event.preventDefault();
    newTodoTitleRef = newTodoInputRef.current.value; // ex7-Wasnt sure what to do
    setNewTodo(event.target.value);
  }

  async function addNewTodo(event) {
    try {
      if (!newTodo) return;
      event.preventDefault();
      const todoToAdd = {
        id: makeId,
        title: newTodo,
        isComplete: false,
      };
      const updatedTodos = [...todos, todoToAdd];

      setTodos(updatedTodos);
      await addNewTodoToServer(todoToAdd);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  }

  async function removeTodo(id) {
    try {
      const updatedTodos = todos.filter((todo) => {
        return todo.id !== id;
      });
      await removeTodoFromServer(id);
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  }

  function calculateProgress() {
    if (totalTodos.length === 0) return 0;
    return (completedTodos / totalTodos) * 100;
  }

  //Filters
  function filterByActive() {
    setFilterOnComplete(false);
    setFilterOnActive(true);
  }
  function filterByCompleted() {
    setFilterOnActive(false);
    setFilterOnComplete(true);
  }

  function handleSearchTodoChange() {
    //The state that cause the filter of the todos on the screen will happened inside that debounce
    debounce();
  }
  function debounce() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFilterOnActive(false);
      setFilterOnComplete(false);
      setNewFilterInput(filterTodoInputRef.current.value); // The state the rerender the ui according to the search
    }, 400);
  }

  function resetFilters() {
    setFilterOnComplete(false);
    setFilterOnActive(false);
    filterTodoInputRef.current.value = "";
    setNewFilterInput("");
  }
  //Greet
  useEffect(() => {
    console.log("Hello");
  }, []);
  //log after every crud operation and focus
  useEffect(() => {
    newTodoInputRef.current.focus();
    console.log(todos);
  }, [todos]);

  return (
    <>
      <h1>Todos</h1>
      <AddTodoForm
        newTodoTitleRef={newTodoTitleRef}
        newTodoInputRef={newTodoInputRef}
        newTodo={newTodo}
        handleNewTodoChange={handleNewTodoChange}
        addNewTodo={addNewTodo}
      />
      <TodoStatistics
        activeTodos={activeTodos}
        completedTodos={completedTodos}
        totalTodos={totalTodos}
        calculateProgress={calculateProgress}
      />
      {todos.length === 0 ? <p>"No todos available"</p> : null}
      <FilterTodos
        newFilterInput={newFilterInput}
        filterTodoInputRef={filterTodoInputRef}
        handleSearchTodoChange={handleSearchTodoChange}
        resetFilters={resetFilters}
        filterByCompleted={filterByCompleted}
        filterByActive={filterByActive}
      />
      <TodoList
        removeTodo={removeTodo}
        todos={filteredItems}
        updateIsComplete={updateIsComplete}
      />
    </>
  );
}

export default App;
