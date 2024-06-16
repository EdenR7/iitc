import React, { useEffect, useState, useRef } from "react";
import Skeleton from "@mui/material/Skeleton";
import TodoItem from "./todoItem";

function TodosLoader() {
  return (
    <div className="todos-lst">
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
    </div>
  );
}

export function TodoList(props) {
  if (props.loading) return <TodosLoader />;
  if (props.todos.length === 0)
    return <p className="todos-lst">No Todos Available</p>;
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
