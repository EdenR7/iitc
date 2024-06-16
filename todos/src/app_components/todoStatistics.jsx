import React, { useEffect, useState, useRef } from "react";

export default function TodoStatistics(props) {
  const { todos } = props; // destructuring the props
  //DERIVED STATES

  const totalTodos = todos.length;
  const completedTodos = todos.reduce((acc, todo) => {
    if (todo.isComplete) acc += 1;
    return acc;
  }, 0);
  const activeTodos = totalTodos - completedTodos;

  function calculateProgress() {
    if (totalTodos.length === 0) return 0;
    return (completedTodos / totalTodos) * 100;
  }

  const progressPrecentages = `${Math.floor(calculateProgress())}%`;

  return (
    <div className="flex-group statistics-container">
      <div className="progress-wrapper">
        <div style={{ width: progressPrecentages }} id="progress">
          <span>{progressPrecentages}</span>
        </div>
      </div>
      <div className="statistics flex-group">
        <h4 className="statistics__total">{totalTodos} Tasks</h4>
        <p className="statistics__completed">{completedTodos} completed</p>
        <p className="statistics__active">{activeTodos} active todos</p>
      </div>
    </div>
  );
}
