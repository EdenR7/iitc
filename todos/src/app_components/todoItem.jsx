import React, { useEffect, useState, useRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChipsList from "./ChipsList";

export default function TodoItem(props) {
  const todo = props.todo;
  return (
    <li className="todo-container flex-group">
      <div className="todo-details-wrapper flex-group">
        <FormControlLabel
          control={
            <Switch
              checked={todo.isComplete}
              onChange={() => {
                props.updateIsComplete(todo);
              }}
            />
          }
        />
        {/* <label
          className={`${
            todo.isComplete ? "completed__toggle-wrapper" : ""
          } toggle-wrapper`}
        >
          <input
            name="check-input"
            checked={todo.isComplete}
            onChange={() => {
              props.updateIsComplete(todo);
            }}
            type="checkbox"
            className="checkbox-element"
          />
          <div className="slider"> </div>
        </label> */}

        <h3 className={`${todo.isComplete ? "completed" : ""} todo-title`}>
          {todo.title}
        </h3>
        <ChipsList chips={todo.labels} clickable={false} onChipClick />
      </div>
      <Tooltip title="Delete Todo">
        <IconButton
          onClick={() => {
            props.removeTodo(todo.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {/* <button
        onClick={() => {
          props.removeTodo(todo.id);
        }}
        className="remove-todo"
      >
        <i className="fa-solid fa-xmark"></i>
      </button> */}
    </li>
  );
}
