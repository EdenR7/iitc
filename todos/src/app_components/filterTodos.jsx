import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingBlock: "3", // Custom padding
          paddingInline: "10",
          minWidth: "50px",
          backgroundColor: "hsl(194, 100%, 27%)", // Custom background color
          color: "white", // Custom text color
          borderRadius: "4px", // Custom border radius
          "&:hover": {
            backgroundColor: "hsl(194, 100%, 24%)", // Custom hover color
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          paddingBlock: "3", // Custom padding
          paddingInline: "10",
          minWidth: "50px",
          backgroundColor: "hsl(194, 100%, 27%)", // Custom background color
          color: "white", // Custom text color
          borderRadius: "4px", // Custom border radius
          "&:hover": {
            backgroundColor: "hsl(194, 100%, 24%)", // Custom hover color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {},
    },
  },
});

export default function FilterTodos(props) {
  return (
    <>
      <div className="filter-container flex-group">
        <h3>Filter By ...</h3>

        <div className="filter-btns flex-group">
          <ThemeProvider theme={theme}>
            <Tooltip title="By Active">
              <IconButton
                onClick={() => {
                  props.filterByActive();
                }}
                className="btn"
              >
                <ToggleOffIcon />
              </IconButton>
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <Tooltip title="By Complete">
              <IconButton
                onClick={() => {
                  props.filterByCompleted();
                }}
                className="btn"
              >
                <ToggleOnIcon />
              </IconButton>
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <Tooltip title="Reset Filters">
              <IconButton
                className="btn"
                onClick={() => {
                  props.resetFilters();
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
        </div>
        <div className="search-warpper flex-group">
          {/* <ThemeProvider theme={theme}>
            <TextField
              id="outlined-search"
              label="Search desired Todo ..."
              variant="outlined"
            />
          </ThemeProvider> */}

          <input
            placeholder="Search desired Todo ..."
            ref={props.filterTodoInputRef}
            onChange={() => {
              props.handleSearchTodoChange();
            }}
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </>
  );
}
