import { Divider } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function TodoLayout() {
  const location = useLocation();
  return (
    <>
      <div id="todo-sidebar" className="flex-group">
        <h3>Todos Side Bar</h3>
        <Divider sx={{}} />
        <ul className="sidebar-lst flex-group">
          <li>
            <Link
              to="create"
              onClick={() => {
                location.search = "";
                console.log(location);
              }}
            >
              Create New Todo
            </Link>
          </li>
          <li>
            <a href="#">Something1</a>
          </li>
          <li>
            <a href="#">Something2</a>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default TodoLayout;
// fix the responsive small issues
