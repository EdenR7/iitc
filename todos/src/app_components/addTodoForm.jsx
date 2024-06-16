import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ChipsList from "./ChipsList";

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
  },
});
const allLabels = ["home", "work", "learnings", "friends", "family"];

export default function AddTodoForm(props) {
  const curChips = props.newTodo.labels;
  return (
    <form
      onSubmit={(event) => {
        props.addNewTodo(event);
      }}
      className="flex-group new-todo-form"
    >
      <TextField
        inputRef={props.newTodoInputRef}
        onChange={(event) => {
          props.handleNewTodoChange(event);
        }}
        value={props.newTodo.title}
        id="outlined-basic"
        label="New Todo ..."
        variant="outlined"
        sx={{
          color: "success.main",
        }}
      />
      <ChipsList
        chips={allLabels}
        clickable={true}
        selectedChips={props.newTodo.labels}
        onChipClick={(chip) => {
          const newChips = curChips.includes(chip)
            ? curChips.filter((item) => item !== chip)
            : [...curChips, chip];
          props.setNewTodo((prev) => {
            return { ...prev, labels: newChips };
          });
        }}
      />
      {/* <input
        ref={props.newTodoInputRef}
        onChange={(event) => {
          props.handleNewTodoChange(event);
        }}
        value={props.newTodo}
        id="new-todo-name"
        type="text"
        placeholder="New Todo ..."
      /> */}
      <ThemeProvider theme={theme}>
        <Button
          className=".custom-button btn"
          variant="contained"
          type="submit"
        >
          <AddIcon />
        </Button>
      </ThemeProvider>

      {/* <button className="btn" type="submit">
        Add New Todo
      </button> */}
    </form>
  );
}
