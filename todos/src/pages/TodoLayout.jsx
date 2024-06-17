import { Divider } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function TodoLayout() {
  return (
    <>
      <div id="todo-sidebar" className="flex-group">
        <h3>Todos Side Bar</h3>
        <Divider sx={{}}/>
        <ul className="sidebar-lst flex-group">
          <li>Create</li>
          <li>Something</li>
          <li>Something</li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default TodoLayout;
