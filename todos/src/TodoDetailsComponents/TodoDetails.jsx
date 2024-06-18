import React from "react";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChipsList from "../TodoPageComponents/ChipsList";

function TodoDetails(props) {
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

export default TodoDetails;
