import React, { useEffect, useState, useRef } from "react";

export default function TodoItem(props) {
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
              props.updateIsComplete(todo);
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
        className="remove-todo"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  );
}
