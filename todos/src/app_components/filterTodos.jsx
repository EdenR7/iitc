import React, { useEffect, useState, useRef } from "react";

export default function FilterTodos(props) {
  return (
    <>
      <div className="filter-container flex-group">
        <div className="filter-btns flex-group">
          <button
            onClick={() => {
              props.filterByActive();
            }}
            className="btn"
          >
            Active Todos
          </button>
          <button
            onClick={() => {
              props.filterByCompleted();
            }}
            className="btn"
          >
            Complete Todos
          </button>
          <button
            onClick={() => {
              props.resetFilters();
            }}
            className="btn"
          >
            Reset Filters
          </button>
        </div>
        <div className="search-warpper">
          <input
          placeholder="Search desired Todo ..."
            ref={props.filterTodoInputRef}
            onChange={() => {
              props.handleSearchTodoChange();
            }}
            type="text"
          />
        </div>
      </div>
    </>
  );
}
