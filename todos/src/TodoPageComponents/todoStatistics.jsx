import React, { useEffect, useState, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          sx={{
            "& .MuiCircularProgress-svg": {
              color:"hsl(120, 100%, 40%)"
            },
          }}
          size={50} // Overall size of the CircularProgress
          thickness={6} // Thickness of the circular progress bar
          variant="determinate"
          value={Math.floor(calculateProgress())}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ fontSize: "1rem" }}
          >
            {`${progressPrecentages}`}
          </Typography>
        </Box>
      </Box>

      {/* <div className="progress-wrapper">
        <div style={{ width: progressPrecentages }} id="progress">
          <span>{progressPrecentages}</span>
        </div>
      </div> */}
      <div className="statistics flex-group">
        <h4 className="statistics__total">{totalTodos} Tasks</h4>
        <p className="statistics__completed">{completedTodos} completed</p>
        <p className="statistics__active">{activeTodos} active todos</p>
      </div>
    </div>
  );
}
