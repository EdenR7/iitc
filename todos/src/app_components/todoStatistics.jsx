import React, { useEffect, useState, useRef } from "react";

export default function TodoStatistics(props) {
  return (
    <div className="flex-group statistics-container">
      <progress
        id="progress"
        value={props.totalTodos ? props.calculateProgress() : 0}
        max="100"
      ></progress>
      <div className="statistics flex-group">
        <h4 className="statistics__total">{props.totalTodos} Tasks</h4>
        <p className="statistics__completed">
          {props.completedTodos} completed
        </p>
        <p className="statistics__active">{props.activeTodos} active todos</p>
      </div>
    </div>
  );
}
