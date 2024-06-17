import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ChipsList from "../TodoPageComponents/ChipsList";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const todosUrl = "http://localhost:8001/todos/";

export function TodoDetails(props) {
  const { currentTodo, setEditMode, removeTodoFromServer } = props;
  if (Object.keys(currentTodo).length === 0) return <p>Not found...</p>;
  return (
    <>
      <div className="title-wrapper flex-group">
        <h2>{currentTodo.title}</h2>
        <Tooltip title="Edit">
          <button
            onClick={() => {
              setEditMode(true);
            }}
            className="strip-btn"
          >
            <EditIcon sx={{ fontSize: "1.2rem", color: "hsl(0, 0%, 60%)" }} />
          </button>
        </Tooltip>
        <Tooltip title="Delete Todo">
          <button
            type="button"
            id="edit-todo-form__remove-btn"
            className="strip-btn"
            onClick={removeTodoFromServer}
          >
            <DeleteIcon sx={{ fontSize: "1.2rem" }} />
          </button>
        </Tooltip>
      </div>
      <h4>
        Status :
        <span
          className={`${
            currentTodo.isComplete ? "completed-todo" : "active-todo"
          } todo-details__status`}
        >
          {currentTodo.isComplete ? "Completed" : " Active"}
        </span>
      </h4>
      <ChipsList chips={currentTodo.labels} clickable={false} />
      <div>
        <h4>Description:</h4>
        <p className="todo_details_description">{currentTodo.description}</p>
      </div>
    </>
  );
}
export function EditTodoForm(props) {
  const { currentTodo, removeTodoFromServer, setEditMode } = props;

  const [editedTodo, setEditedTodo] = useState({ ...currentTodo });
  async function putUpdateTodo() {
    try {
      await axios.put(todosUrl + editedTodo.id, editedTodo);
    } catch (err) {
      throw err;
    }
  }
  return (
    <>
      <form
        id="edit-todo-form"
        className="flex-group"
        onSubmit={(ev) => {
          ev.preventDefault();
          putUpdateTodo();
          setEditMode(false);
        }}
      >
        <div className="edit-todo-form__form-group flex-group">
          <label htmlFor="">Todo Title :</label>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(ev) =>
              setEditedTodo((prev) => {
                return { ...prev, title: ev.target.value };
              })
            }
          />
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label>Todo Status: </label>
          <label
            className={`${
              editedTodo.isComplete ? "completed__toggle-wrapper" : ""
            } toggle-wrapper`}
          >
            <input
              name="check-input"
              checked={editedTodo.isComplete}
              onChange={() => {
                setEditedTodo((prev) => {
                  return { ...prev, isComplete: !editedTodo.isComplete };
                });
              }}
              type="checkbox"
              className="checkbox-element"
            />
            <div className="slider"></div>
          </label>
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label>Labels: </label>
          <ChipsList
            chips={allLabels}
            clickable={true}
            selectedChips={editedTodo.labels}
            onChipClick={(chip) => {
              const newChips = curChips.includes(chip)
                ? curChips.filter((item) => item !== chip)
                : [...curChips, chip];
              setEditedTodo((prev) => {
                return { ...prev, labels: newChips };
              });
            }}
          />
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label htmlFor="edit-todo-form__description">Description :</label>
          <textarea
            id="edit-todo-form__description"
            value={editedTodo.description}
            onChange={(ev) => {
              setEditedTodo((prev) => {
                return {
                  ...prev,
                  description: ev.target.value,
                };
              });
            }}
          />
        </div>
          <button id="submit-edit-todo" className="btn" type="submit">
            Submit Changes
          </button>
      </form>
    </>
  );
}

const allLabels = ["home", "work", "learnings", "friends", "family"];

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [currentTodo, setCurrentTodo] = useState({});
  const [editedTodo, setEditedTodo] = useState({});
  const [editMode, setEditMode] = useState(false);

  const curChips = editedTodo.labels;
  const navigate = useNavigate();
  //Sever CRUD:

  async function removeTodoFromServer() {
    try {
      await axios.delete(todosUrl + editedTodo.id);
      navigate("/todo", { replace: true });
    } catch (error) {
      throw error;
    }
  }
  async function getTodo() {
    try {
      const { data } = await axios.get(todosUrl + todoId);
      setEditedTodo(data);
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

//Add snack bars
export default TodoDetailsPage;
