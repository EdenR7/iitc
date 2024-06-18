import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";

import axios from "axios";
import { TodoList } from "../TodoPageComponents/todoList";
import TodoStatistics from "../TodoPageComponents/todoStatistics";
import AddTodoForm from "../TodoPageComponents/addTodoForm";
import FilterTodos from "../TodoPageComponents/filterTodos";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AppBar } from "@mui/material";
// import TodosAppBar from "./app_components/AppBar";
import DrawerAppBar from "../TodoPageComponents/AppBar";

export const todosUrl = "http://localhost:8001/todos";

function TodoPage() {
  // STATES
  const [todos, setTodos] = useState([]); //All todos state
  const [newTodo, setNewTodo] = useState({ title: "", labels: [] }); // Add new todo input state
  // const [newFilterInput, setNewFilterInput] = useState(""); // Filter search input state
  // const [filterOnActive, setFilterOnActive] = useState(false); // State for filter by active
  // const [filterOnComplete, setFilterOnComplete] = useState(false); // State for filter by complete
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    transition: "SlideTransition",
    alertSeverity: "success",
    hideDuration: 1500,
    message: "",
    closeSnack: () => {
      setOpenSnackBar({ ...openSnackBar, open: false });
    },
  });
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    byStatus: "",
  });
  const q = searchParams.get("q");
  const byActive = searchParams.get("byStatus") === "active";
  const byComplete = searchParams.get("byStatus") === "completed";

  const location = useLocation();
  //USE_REFS
  const newTodoInputRef = useRef(null);
  const filterTodoInputRef = useRef(null);
  const timeoutRef = useRef(null);

  //DERIVED STATES
  const filteredItems = useMemo(() => {
    // this hook specify when It should run the code
    return !byActive && !byComplete //The default, as long as the user didnt press one of the filters buttons
      ? todos.filter((todo) => {
          if (!q) return todo;
          return todo.title?.toLowerCase().includes(q?.toLowerCase());
        })
      : byActive // if the user press one of the options it will check which button pressed
      ? todos.filter((todo) => !todo.isComplete)
      : todos.filter((todo) => todo.isComplete);
  }, [todos, searchParams]);
  // const filteredItems = useMemo(() => {
  //   // this hook specify when It should run the code
  //   return !filterOnActive && !filterOnComplete //The default, as long as the user didnt press one of the filters buttons
  //     ? todos.filter((todo) =>
  //         todo.title.toLowerCase().includes(newFilterInput.toLowerCase())
  //       )
  //     : filterOnActive // if the user press one of the options it will check which button pressed
  //     ? todos.filter((todo) => !todo.isComplete)
  //     : todos.filter((todo) => todo.isComplete);
  // }, [newFilterInput, filterOnActive, filterOnComplete, todos]);

  //Initialize the todos
  useEffect(() => {
    getTodos();
  }, [location.pathname]);
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
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "success",
          hideDuration: 1500,
          message: `"${todoToUpdate.title}" status changed!`,
        };
      });
    } catch (err) {
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "error",
          hideDuration: 1500,
          message: `Failed to change status`,
        };
      });
      console.error(err);
    }
  }
  function handleNewTodoChange(event) {
    event.preventDefault();
    setNewTodo((prev) => {
      return { ...prev, title: event.target.value };
    });
  }

  async function addNewTodo(event) {
    try {
      if (!newTodo) return;
      event.preventDefault();
      const todoToAdd = {
        ...newTodo,
        isComplete: false,
      };
      const newTodoFetched = await addNewTodoToServer(todoToAdd);
      setTodos((prevTodos) => [...prevTodos, newTodoFetched]);
      setNewTodo({ title: "", labels: [] });
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "success",
          hideDuration: 1500,
          message: `"${newTodoFetched.title}" Todo Added!`,
        };
      });
    } catch (err) {
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "error",
          hideDuration: 1500,
          message: `Failed to add "${newTodo.title}"`,
        };
      });
      console.error(err);
    }
  }

  async function removeTodo(id) {
    try {
      await removeTodoFromServer(id);
      let removedTodoTitle;
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => {
          if (todo.id === id) removedTodoTitle = todo.title;
          return todo.id !== id;
        });
      });
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "success",
          hideDuration: 1500,
          message: `"${removedTodoTitle}" Removed successfully!`,
        };
      });
    } catch (err) {
      setOpenSnackBar((prev) => {
        return {
          ...prev,
          open: true,
          alertSeverity: "error",
          hideDuration: 1500,
          message: `Error in delete proccess !`,
        };
      });
      console.error(err);
    }
  }
  //Filters
  function filterByActive() {
    filterTodoInputRef.current.value = "";
    setSearchParams(
      (prev) => {
        prev.set("q", "");
        prev.set("byStatus", "active");
        return prev;
      },
      { replace: true }
    );
    // setFilterOnComplete(false);
    // setFilterOnActive(true);
  }
  function filterByCompleted() {
    filterTodoInputRef.current.value = "";
    setSearchParams(
      (prev) => {
        prev.set("q", "");
        prev.set("byStatus", "completed");
        return prev;
      },
      { replace: true }
    );
    // setFilterOnActive(false);
    // setFilterOnComplete(true);
  }

  function handleSearchTodoChange() {
    //The state that cause the filter of the todos on the screen will happened inside that debounce
    debounce();
  }
  function debounce() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchParams((prev) => {
        prev.set("q", filterTodoInputRef.current.value);
        prev.set("byStatus", "");
        return prev;
      });
      // setFilterOnActive(false);
      // setFilterOnComplete(false);
      // setNewFilterInput(filterTodoInputRef.current.value); // The state the rerender the ui according to the search
    }, 400);
  }

  function resetFilters() {
    setSearchParams(
      (prev) => {
        prev.set("q", "");
        prev.set("byStatus", "");
        return prev;
      },
      { replace: true }
    );
    // setFilterOnComplete(false);
    // setFilterOnActive(false);
    filterTodoInputRef.current.value = "";
    // setNewFilterInput("");
  }

  //Focus
  useEffect(() => {
    newTodoInputRef.current.focus();
  }, []);

  return (
    <>
      <DrawerAppBar />
      <h1>Todos</h1>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={openSnackBar.hideDuration}
        open={openSnackBar.open}
        message={openSnackBar.message}
        onClose={openSnackBar.closeSnack}
      >
        <Alert severity={openSnackBar.alertSeverity}>
          {openSnackBar.message}
        </Alert>
      </Snackbar>
      <AddTodoForm
        newTodoInputRef={newTodoInputRef}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleNewTodoChange={handleNewTodoChange}
        addNewTodo={addNewTodo}
      />
      <div className="flex-group" id="filter-statistics-container">
        <TodoStatistics todos={todos} />
        <FilterTodos
          // newFilterInput={newFilterInput}
          filterTodoInputRef={filterTodoInputRef}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleSearchTodoChange={handleSearchTodoChange}
          resetFilters={resetFilters}
          filterByCompleted={filterByCompleted}
          filterByActive={filterByActive}
        />
      </div>

      <TodoList
        loading={loading}
        removeTodo={removeTodo}
        todos={filteredItems}
        updateIsComplete={updateIsComplete}
      />
      <Outlet />
    </>
  );
}

export default TodoPage;
// improve design of statistics
// reset the query params after click the create link

// import React, { useEffect, useState, useRef, useMemo } from "react";

// import axios from "axios";
// import TodoStatistics from "./app_components/todoStatistics";
// import { TodoList } from "./app_components/todoList";
// import AddTodoForm from "./app_components/addTodoForm";
// import FilterTodos from "./app_components/filterTodos";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { AppBar } from "@mui/material";
// import TodosAppBar from "./app_components/AppBar";
// import DrawerAppBar from "./app_components/AppBar";

// const todosUrl = "http://localhost:8001/todos";

// function App() {
//   // STATES
//   const [todos, setTodos] = useState([]); //All todos state
//   const [newTodo, setNewTodo] = useState({ title: "", labels: [] }); // Add new todo input state
//   const [newFilterInput, setNewFilterInput] = useState(""); // Filter search input state
//   const [filterOnActive, setFilterOnActive] = useState(false); // State for filter by active
//   const [filterOnComplete, setFilterOnComplete] = useState(false); // State for filter by complete
//   const [loading, setLoading] = useState(false);
//   const [openSnackBar, setOpenSnackBar] = useState({
//     open: false,
//     transition: "SlideTransition",
//     alertSeverity: "success",
//     hideDuration: 1500,
//     message: "",
//     closeSnack: () => {
//       setOpenSnackBar({ ...openSnackBar, open: false });
//     },
//   });

//   //USE_REFS
//   const newTodoInputRef = useRef(null);
//   const filterTodoInputRef = useRef(null);
//   const timeoutRef = useRef(null);

//   //DERIVED STATES
//   const filteredItems = useMemo(() => {
//     // this hook specify when It should run the code
//     return !filterOnActive && !filterOnComplete //The default, as long as the user didnt press one of the filters buttons
//       ? todos.filter((todo) =>
//           todo.title.toLocaleLowerCase().includes(newFilterInput.toLowerCase())
//         )
//       : filterOnActive // if the user press one of the options it will check which button pressed
//       ? todos.filter((todo) => !todo.isComplete)
//       : todos.filter((todo) => todo.isComplete);
//   }, [newFilterInput, filterOnActive, filterOnComplete, todos]);

//   //Initialize the todos
//   useEffect(() => {
//     getTodos();
//   }, []);
//   async function getTodos() {
//     try {
//       setLoading(true);
//       const response = await fetch(todosUrl);
//       const updatedTodos = await response.json();
//       setTodos(updatedTodos);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   //ONLY SERVER CRUD
//   async function updateTodoStatusOnServer(todo, newStatus) {
//     try {
//       const res = await fetch(`${todosUrl}/${todo.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...todo, isComplete: newStatus }),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async function addNewTodoToServer(newTodo) {
//     try {
//       const res = await fetch(todosUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...newTodo }),
//       });
//       return await res.json();
//     } catch (error) {
//       throw error;
//     }
//   }
//   async function removeTodoFromServer(todoId) {
//     try {
//       await fetch(`${todosUrl}/${todoId}`, {
//         method: "DELETE",
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
//   //SERVER AND LOCAL CRUD
//   async function updateIsComplete(todoToUpdate) {
//     try {
//       updateTodoStatusOnServer(todoToUpdate, !todoToUpdate.isComplete);
//       setTodos((prevTodos) => {
//         return prevTodos.map((todo) => {
//           if (todo.id === todoToUpdate.id) {
//             return {
//               ...todo,
//               isComplete: !todoToUpdate.isComplete,
//             };
//           }
//           return todo;
//         });
//       });
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "success",
//           hideDuration: 1500,
//           message: `"${todoToUpdate.title}" status changed!`,
//         };
//       });
//     } catch (err) {
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "error",
//           hideDuration: 1500,
//           message: `Failed to change status`,
//         };
//       });
//       console.error(err);
//     }
//   }
//   function handleNewTodoChange(event) {
//     event.preventDefault();
//     setNewTodo((prev) => {
//       return { ...prev, title: event.target.value };
//     });
//   }

//   async function addNewTodo(event) {
//     try {
//       if (!newTodo) return;
//       event.preventDefault();
//       const todoToAdd = {
//         ...newTodo,
//         isComplete: false,
//       };
//       const newTodoFetched = await addNewTodoToServer(todoToAdd);
//       setTodos((prevTodos) => [...prevTodos, newTodoFetched]);
//       setNewTodo({ title: "", labels: [] });
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "success",
//           hideDuration: 1500,
//           message: `"${newTodoFetched.title}" Todo Added!`,
//         };
//       });
//     } catch (err) {
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "error",
//           hideDuration: 1500,
//           message: `Failed to add "${newTodo.title}"`,
//         };
//       });
//       console.error(err);
//     }
//   }

//   async function removeTodo(id) {
//     try {
//       await removeTodoFromServer(id);
//       let removedTodoTitle;
//       setTodos((prevTodos) => {
//         return prevTodos.filter((todo) => {
//           if (todo.id === id) removedTodoTitle = todo.title;
//           return todo.id !== id;
//         });
//       });
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "success",
//           hideDuration: 1500,
//           message: `"${removedTodoTitle}" Removed successfully!`,
//         };
//       });
//     } catch (err) {
//       setOpenSnackBar((prev) => {
//         return {
//           ...prev,
//           open: true,
//           alertSeverity: "error",
//           hideDuration: 1500,
//           message: `Error in delete proccess !`,
//         };
//       });
//       console.error(err);
//     }
//   }

//   //Filters
//   function filterByActive() {
//     setFilterOnComplete(false);
//     setFilterOnActive(true);
//   }
//   function filterByCompleted() {
//     setFilterOnActive(false);
//     setFilterOnComplete(true);
//   }

//   function handleSearchTodoChange() {
//     //The state that cause the filter of the todos on the screen will happened inside that debounce
//     debounce();
//   }
//   function debounce() {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setFilterOnActive(false);
//       setFilterOnComplete(false);
//       setNewFilterInput(filterTodoInputRef.current.value); // The state the rerender the ui according to the search
//     }, 400);
//   }

//   function resetFilters() {
//     setFilterOnComplete(false);
//     setFilterOnActive(false);
//     filterTodoInputRef.current.value = "";
//     setNewFilterInput("");
//   }

//   //Focus
//   useEffect(() => {
//     newTodoInputRef.current.focus();
//   }, []);

//   return (
//     <>
//       <DrawerAppBar />
//       <h1>Todos</h1>
//       <Snackbar
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         autoHideDuration={openSnackBar.hideDuration}
//         open={openSnackBar.open}
//         message={openSnackBar.message}
//         onClose={openSnackBar.closeSnack}
//       >
//         <Alert severity={openSnackBar.alertSeverity}>
//           {openSnackBar.message}
//         </Alert>
//       </Snackbar>
//       <AddTodoForm
//         newTodoInputRef={newTodoInputRef}
//         newTodo={newTodo}
//         setNewTodo={setNewTodo}
//         handleNewTodoChange={handleNewTodoChange}
//         addNewTodo={addNewTodo}
//       />

//       <FilterTodos
//         newFilterInput={newFilterInput}
//         filterTodoInputRef={filterTodoInputRef}
//         handleSearchTodoChange={handleSearchTodoChange}
//         resetFilters={resetFilters}
//         filterByCompleted={filterByCompleted}
//         filterByActive={filterByActive}
//       />
//       <div className="grid-group todos-main-container">
//         <TodoStatistics todos={todos} />
//         <TodoList
//           loading={loading}
//           removeTodo={removeTodo}
//           todos={filteredItems}
//           updateIsComplete={updateIsComplete}
//         />
//       </div>
//     </>
//   );
// }
