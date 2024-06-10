import React, { useEffect, useState, useRef } from "react";
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

function TodoItem(props) {
  const todo = props.todo;
  return (
    <li className="todo-container flex-group">
      <div className="todo-details-wrapper flex-group">
        <label
          className={`${
            todo.isComplete ? "completed__toggle-wrapper" : ""
          } toggle-wrapper`}
        >
          <input
            name="check-input"
            checked={todo.isComplete}
            onChange={() => {
              props.updateIsComplete(todo.id);
            }}
            type="checkbox"
            className="checkbox-element"
          />
          <div className="slider"> </div>
        </label>

        <h3 className={`${todo.isComplete ? "completed" : ""} todo-title`}>
          {todo.title}
        </h3>
      </div>
      <button
        onClick={() => {
          props.removeTodo(todo.id);
        }}
        className="btn remove-todo"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  );
}

function TodoList(props) {
  return (
    <>
      <ul className="todos-lst">
        {props.todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              updateIsComplete={props.updateIsComplete}
              removeTodo={props.removeTodo}
              todo={todo}
            />
          );
        })}
      </ul>
    </>
  );
}

function TodoStatistics(props) {
  return (
    <div className="flex-group statistics-container">
      <progress
        id="progress"
        value={props.totalTodos ? props.calculateProgress() : 0}
        max="100"
      ></progress>
      <div className="statistics flex-group">
        <h4 className="statistics__total">{props.totalTodos} Tasks</h4>
        <p className="statistics__completed">
          {props.completedTodos} completed
        </p>
        <p className="statistics__active">{props.activeTodos} active todos</p>
      </div>
    </div>
  );
}

function AddTodoForm(props) {
  return (
    <form
      onSubmit={(event) => {
        props.addNewTodo(event);
      }}
      className="flex-group new-todo-form"
    >
      <input
        ref={props.newTodoInputRef}
        onChange={(event) => {
          props.handleNewTodoChange(event);
        }}
        value={props.newTodo}
        id="new-todo-name"
        type="text"
        placeholder="New Todo ..."
      />
      <button className="btn" type="submit">
        Add New Todo
      </button>
    </form>
  );
}

function FilterTodos(props) {
  return (
    <>
      <div className="filter-container flex-group">
        <div className="filter-btns flex-group">
          <button
            onClick={() => {
              props.filterByActive();
            }}
            className="btn"
          >
            Active Todos
          </button>
          <button
            onClick={() => {
              props.filterByCompleted();
            }}
            className="btn"
          >
            Complete Todos
          </button>
          <button
            onClick={() => {
              props.resetFilters();
            }}
            className="btn"
          >
            Reset Filters
          </button>
        </div>
        <div className="search-warpper">
          <input
            ref={props.filterTodoInputRef}
            onChange={() => {
              props.handleSearchTodoChange();
            }}
            type="text"
          />
        </div>
      </div>
    </>
  );
}

function App() {
  // STATES
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filterTodos, setFilterTodos] = useState([]);

  //USE_REFS
  const newTodoInputRef = useRef(null);
  let newTodoTitleRef = useRef(""); // ex7-Want sure what to do
  const filterTodoInputRef = useRef(null);
  let filterTodoTitleRef = useRef("");
  const onFilterRef = useRef(false);
  const timeoutRef = useRef(null);

  //DERIVED STATES
  const totalTodos = todos.length;
  const completedTodos = todos.reduce((acc, todo) => {
    if (todo.isComplete) acc += 1;
    return acc;
  }, 0);
  const activeTodos = totalTodos - completedTodos;

  //Initialize the todos
  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    const response = await fetch(todosUrl);
    const updatedTodos = await response.json();
    setTodos(updatedTodos);
  }

  //SERVER CRUD
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
  //Local operations
  async function updateIsComplete(todoID) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoID) {
        try {
          updateTodoStatusOnServer(todo, todo.isComplete ? false : true).then();
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
    if (filterTodos.length > 0) {
      const updatedFilterTodos = filterTodos.filter(
        (todo) => todo.id !== todoID
      );
      setFilterTodos(updatedFilterTodos);
    }
  }
  function handleNewTodoChange(event) {
    event.preventDefault();
    newTodoTitleRef = newTodoInputRef.current.value; // ex7-Want sure what to do
    setNewTodo(event.target.value);
  }

  async function addNewTodo(event) {
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
  }

  async function removeTodo(id) {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    await removeTodoFromServer(id);
    setTodos(updatedTodos);
    if (onFilterRef) {
      const updatedFilterTodos = filterTodos.filter((todo) => todo.id !== id);
      setFilterTodos(updatedFilterTodos);
    }
  }

  function calculateProgress() {
    if (totalTodos.length === 0) return 0;
    return (completedTodos / totalTodos) * 100;
  }

  //Filters
  async function filterByActive() {
    // get all the filters from api req
    try {
      onFilterRef.current = true;
      const res = await fetch(`${todosUrl}?isComplete=false`);
      const activeTodos = await res.json();
      filterTodoTitleRef.current = "";
      setFilterTodos(activeTodos);
    } catch (error) {
      throw error;
    }
  }

  async function filterByCompleted() {
    try {
      onFilterRef.current = true;
      const res = await fetch(`${todosUrl}?isComplete=true`);
      const activeTodos = await res.json();
      filterTodoTitleRef = "";
      setFilterTodos(activeTodos);
    } catch (error) {
      throw error;
    }
  }

  function filterByName() {
    onFilterRef.current = true;
    const updatedFilteredTodos = todos.filter((todo) =>
      todo.title
        .toLocaleLowerCase()
        .includes(filterTodoTitleRef.current.toLocaleLowerCase())
    );
    setFilterTodos(updatedFilteredTodos);
  }
  function handleSearchTodoChange() {
    filterTodoTitleRef.current = filterTodoInputRef.current.value;
    debounce();
  }
  function debounce() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(filterByName, 400);
  }

  function resetFilters() {
    onFilterRef.current = false;
    filterTodoTitleRef.current = ""; // reset the userRef last search
    filterTodoInputRef.current.value = "";
    setFilterTodos([]);
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
        filterByName={filterByName}
        filterTodoInputRef={filterTodoInputRef}
        filterTodoTitleRef={filterTodoTitleRef}
        handleSearchTodoChange={handleSearchTodoChange}
        resetFilters={resetFilters}
        filterByCompleted={filterByCompleted}
        filterByActive={filterByActive}
      />
      <TodoList
        removeTodo={removeTodo}
        todos={onFilterRef.current ? filterTodos : todos}
        updateIsComplete={updateIsComplete}
      />
    </>
  );
}

export default App;
