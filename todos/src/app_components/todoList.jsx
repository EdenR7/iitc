import React, { useEffect, useState, useRef } from "react";
import TodoItem from "./todoItem";

export function TodoList(props) {
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
