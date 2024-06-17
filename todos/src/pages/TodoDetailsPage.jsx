import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";
import ChipsList from "../TodoPageComponents/ChipsList";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const todosUrl = "http://localhost:8001/todos/";

export function TodoDetails(props) {
  const { currentTodo } = props;
  if (Object.keys(currentTodo).length === 0) return <p>Not found...</p>;
  return (
    <>
      <div className="title-wrapper flex-group">
        <h2>{currentTodo.title}</h2>
        <Tooltip title="Edit">
          <button className="strip-btn">
            <EditIcon sx={{ fontSize: "1.2rem", color: "hsl(0, 0%, 60%)" }} />
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
export function EditTodoForm(params) {}

const allLabels = ["home", "work", "learnings", "friends", "family"];

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [currentTodo, setCurrentTodo] = useState({});
  const [editedTodo, setEditedTodo] = useState({});
  const [editMode, serEditMode] = useState(false);

  const curChips = editedTodo.labels;

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
      getTodo();
    } catch (error) {
      throw error;
    }
  }, []);
  return (
    <>
      <section id="todo-details-container" className=" flex-group">
        {/* <TodoDetails currentTodo={currentTodo} /> */}

        <form
          id="edit-todo-form"
          className="flex-group"
          onSubmit={(ev) => {
            ev.preventDefault();
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
          <div className="btn-form-wrapper">
            <button id="submit-edit-todo" className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default TodoDetailsPage;
