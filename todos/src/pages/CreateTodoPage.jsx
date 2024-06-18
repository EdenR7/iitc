import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { allLabels } from "./TodoDetailsPage";
import PublishIcon from "@mui/icons-material/Publish";
import ChipsList from "../TodoPageComponents/ChipsList";
import { Tooltip } from "@mui/material";
import { todosUrl } from "./TodoPage";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function CreateTodoPage() {
  const [newTodo, setNewTodo] = useState({
    title: "",
    isComplete: false,
    labels: [],
    description: "",
  });
  const curChips = newTodo.labels;
  const navigate = useNavigate();

  async function createNewTodo() {
    try {
      await axios.post(todosUrl, newTodo);
      closeModal();
    } catch (error) {
      throw error;
    }
  }

  function closeModal() {
    navigate("/todo", { replace: true });
  }

  return (
    <>
      <div id="">
        <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <button id="close-modal" className="strip-btn" onClick={closeModal}>
              <CloseIcon />
            </button>
            <h2>Create New Todo</h2>
            <form
              className="flex-group"
              id="form-create-new-todo"
              onSubmit={(ev) => {
                ev.preventDefault();
                createNewTodo();
              }}
            >
              <div className="form-group flex-group">
                <label htmlFor="create-todo-form__title">Title :</label>
                <input
                  id="create-todo-form__title"
                  type="text"
                  value={newTodo.title}
                  onChange={(ev) =>
                    setNewTodo((prev) => {
                      return { ...prev, title: ev.target.value };
                    })
                  }
                />
              </div>
              <div className="form-group flex-group">
                <label>Labels: </label>
                <ChipsList
                  chips={allLabels}
                  clickable={true}
                  selectedChips={newTodo.labels}
                  onChipClick={(chip) => {
                    const newChips = curChips.includes(chip)
                      ? curChips.filter((item) => item !== chip)
                      : [...curChips, chip];
                    setNewTodo((prev) => {
                      return { ...prev, labels: newChips };
                    });
                  }}
                />
              </div>
              <div className="form-group flex-group">
                <label htmlFor="create-todo-form__description">
                  Description :
                </label>
                <textarea
                  id="create-todo-form__description"
                  value={newTodo.description}
                  onChange={(ev) => {
                    setNewTodo((prev) => {
                      return {
                        ...prev,
                        description: ev.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="form-group flex-group">
                <Tooltip title="Create">
                  <button id="submit-create-todo" className="btn" type="submit">
                    <PublishIcon />
                  </button>
                </Tooltip>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default CreateTodoPage;

//Validations
//snackBar
