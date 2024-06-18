import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChipsList from "../TodoPageComponents/ChipsList";
import { allLabels } from "../pages/TodoDetailsPage";
const todosUrl = "http://localhost:8001/todos/";

export default function EditTodoForm(props) {
  const { currentTodo, setEditMode } = props;

  const [editedTodo, setEditedTodo] = useState({ ...currentTodo });
  const curChips = editedTodo.labels;

  async function putUpdateTodo() {
    try {
      await axios.put(todosUrl + editedTodo.id, editedTodo);
    } catch (err) {
      throw err;
    }
  }
  return (
    <>
      <form
        id="edit-todo-form"
        className="flex-group"
        onSubmit={(ev) => {
          ev.preventDefault();
          putUpdateTodo();
          setEditMode(false);
        }}
      >
        <div className="edit-todo-form__form-group flex-group">
          <label htmlFor="">Todo Title :</label>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(ev) =>
              setEditedTodo((prev) => {
                return { ...prev, title: ev.target.value };
              })
            }
          />
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label>Todo Status: </label>
          <label
            className={`${
              editedTodo.isComplete ? "completed__toggle-wrapper" : ""
            } toggle-wrapper`}
          >
            <input
              name="check-input"
              checked={editedTodo.isComplete}
              onChange={() => {
                setEditedTodo((prev) => {
                  return { ...prev, isComplete: !editedTodo.isComplete };
                });
              }}
              type="checkbox"
              className="checkbox-element"
            />
            <div className="slider"></div>
          </label>
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label>Labels: </label>
          <ChipsList
            chips={allLabels}
            clickable={true}
            selectedChips={editedTodo.labels}
            onChipClick={(chip) => {
              const newChips = curChips.includes(chip)
                ? curChips.filter((item) => item !== chip)
                : [...curChips, chip];
              setEditedTodo((prev) => {
                return { ...prev, labels: newChips };
              });
            }}
          />
        </div>

        <div className="edit-todo-form__form-group flex-group">
          <label htmlFor="edit-todo-form__description">Description :</label>
          <textarea
            id="edit-todo-form__description"
            value={editedTodo.description}
            onChange={(ev) => {
              setEditedTodo((prev) => {
                return {
                  ...prev,
                  description: ev.target.value,
                };
              });
            }}
          />
        </div>
        <button id="submit-edit-todo" className="btn" type="submit">
          Submit Changes
        </button>
      </form>
    </>
  );
}
