import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import TodoStatistics from "./app_components/todoStatistics";
import { TodoList } from "./app_components/todoList";
import AddTodoForm from "./app_components/addTodoForm";
import FilterTodos from "./app_components/filterTodos";
const todosUrl = "http://localhost:8001/todos";

function App() {
  // STATES
  const [todos, setTodos] = useState([]); //All todos state
  const [newTodo, setNewTodo] = useState(""); // Add new todo input state
  const [newFilterInput, setNewFilterInput] = useState(""); // Filter search input state
  const [filterOnActive, setFilterOnActive] = useState(false); // State for filter by active
  const [filterOnComplete, setFilterOnComplete] = useState(false); // State for filter by complete
  const [loading, setLoading] = useState(false);

  //USE_REFS
  const newTodoInputRef = useRef(null);
  const filterTodoInputRef = useRef(null);
  const timeoutRef = useRef(null);

  //DERIVED STATES
  const filteredItems = useMemo(() => {
    // this hook specify when It should run the code
    return !filterOnActive && !filterOnComplete //The default, as long as the user didnt press one of the filters buttons
      ? todos.filter((todo) =>
          todo.title.toLocaleLowerCase().includes(newFilterInput.toLowerCase())
        )
      : filterOnActive // if the user press one of the options it will check which button pressed
      ? todos.filter((todo) => !todo.isComplete)
      : todos.filter((todo) => todo.isComplete);
  }, [newFilterInput, filterOnActive, filterOnComplete, todos]);

  //Initialize the todos
  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    try {
      setLoading(true);
      const response = await fetch(todosUrl);
      const updatedTodos = await response.json();
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  //ONLY SERVER CRUD
  async function updateTodoStatusOnServer(todo, newStatus) {
    try {
      const res = await fetch(`${todosUrl}/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, isComplete: newStatus }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function addNewTodoToServer(newTodo) {
    try {
      const res = await fetch(todosUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTodo }),
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
  async function removeTodoFromServer(todoId) {
    try {
      await fetch(`${todosUrl}/${todoId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }
  //SERVER AND LOCAL CRUD
  async function updateIsComplete(todoToUpdate) {
    try {
      updateTodoStatusOnServer(todoToUpdate, !todoToUpdate.isComplete);
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoToUpdate.id) {
            return {
              ...todo,
              isComplete: !todoToUpdate.isComplete,
            };
          }
          return todo;
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
  function handleNewTodoChange(event) {
    event.preventDefault();
    setNewTodo(event.target.value);
  }

  async function addNewTodo(event) {
    try {
      if (!newTodo) return;
      event.preventDefault();
      const todoToAdd = {
        title: newTodo,
        isComplete: false,
      };

      const newTodoFetched = await addNewTodoToServer(todoToAdd);
      setTodos((prevTodos) => [...prevTodos, newTodoFetched]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  }

  async function removeTodo(id) {
    try {
      await removeTodoFromServer(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => {
          return todo.id !== id;
        });
      });
    } catch (err) {
      console.error(err);
    }
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

  //Focus
  useEffect(() => {
    newTodoInputRef.current.focus();
  }, [todos]);

  return (
    <>
      <h1>Todos</h1>
      <AddTodoForm
        newTodoInputRef={newTodoInputRef}
        newTodo={newTodo}
        handleNewTodoChange={handleNewTodoChange}
        addNewTodo={addNewTodo}
      />

      <FilterTodos
        newFilterInput={newFilterInput}
        filterTodoInputRef={filterTodoInputRef}
        handleSearchTodoChange={handleSearchTodoChange}
        resetFilters={resetFilters}
        filterByCompleted={filterByCompleted}
        filterByActive={filterByActive}
      />
      <div className="grid-group todos-main-container">
        <TodoStatistics todos={todos} />
        <TodoList
          loading={loading}
          removeTodo={removeTodo}
          todos={filteredItems}
          updateIsComplete={updateIsComplete}
        />
      </div>
    </>
  );
}

export default App;
