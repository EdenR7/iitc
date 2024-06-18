import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function TodosSideBar(props) {
  const location = useLocation();
  return (
    <div id="todo-sidebar" className="flex-group">
      <h3>Todos Side Bar</h3>
      <Divider sx={{}} />
      <ul className="sidebar-lst flex-group">
        <li>
          <Link
            to="create"
            onClick={() => {
              location.search = "";
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
  );
}

function TodoLayout() {
  const [isScreenBig, setIsScreenBig] = useState(window.innerWidth > 600);
  const [displaySideBar, setDisplaySideBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenBig(window.innerWidth > 680);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isScreenBig || displaySideBar ? (
        <TodosSideBar />
      ) : (
        <button
          id="todos-sidebar-btn"
          className="btn"
          type="button"
          onClick={() => {
            setDisplaySideBar(true);
          }}
        >
          Todos SideBar
        </button>
      )}

      <Outlet />
    </>
  );
}

export default TodoLayout;
// fix the responsive small issues
