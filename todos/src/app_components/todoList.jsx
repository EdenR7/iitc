import React, { useEffect, useState, useRef } from "react";
import TodoItem from "./todoItem";

export function TodoList(props) {
  if (props.loading) return <div className="loader">Loading...</div>;
  if (props.todos.length === 0)
    return <p className="no-todos">No Todos Available</p>;
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
