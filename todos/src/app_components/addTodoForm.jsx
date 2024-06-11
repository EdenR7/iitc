import React, { useEffect, useState, useRef } from "react";

export default function AddTodoForm(props) {
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
