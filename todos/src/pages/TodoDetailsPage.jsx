import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TodoDetails from "../TodoDetailsComponents/TodoDetails";
import EditTodoForm from "../TodoDetailsComponents/EditTodoForm";
const todosUrl = "http://localhost:8001/todos/";

export const allLabels = ["home", "work", "learnings", "friends", "family"];

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [currentTodo, setCurrentTodo] = useState({});
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  //Sever CRUD:
  async function removeTodoFromServer() {
    try {
      await axios.delete(todosUrl + todoId);
      navigate("/todo", { replace: true });
    } catch (error) {
      throw error;
    }
  }
  async function getTodo() {
    try {
      const { data } = await axios.get(todosUrl + todoId);
      setCurrentTodo(data);
    } catch (err) {
      throw err;
    }
  }
  useEffect(() => {
    try {
      console.log("here");
      getTodo();
    } catch (error) {
      throw error;
    }
  }, [editMode]);
  return (
    <>
      <section id="todo-details-container" className=" flex-group">
        {editMode ? (
          <EditTodoForm
            setEditMode={setEditMode}
            removeTodoFromServer={removeTodoFromServer}
            currentTodo={currentTodo}
          />
        ) : (
          <TodoDetails
            removeTodoFromServer={removeTodoFromServer}
            setEditMode={setEditMode}
            currentTodo={currentTodo}
          />
        )}
      </section>
    </>
  );
}

// add return to todoDetails
//Add snack bars
export default TodoDetailsPage;
