import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TodoDetails from "../TodoDetailsComponents/TodoDetails";
import EditTodoForm from "../TodoDetailsComponents/EditTodoForm";
const todosUrl = "http://localhost:8001/todos/";

// export function EditTodoForm(props) {
//   const { currentTodo, removeTodoFromServer, setEditMode } = props;

//   const [editedTodo, setEditedTodo] = useState({ ...currentTodo });
//   async function putUpdateTodo() {
//     try {
//       await axios.put(todosUrl + editedTodo.id, editedTodo);
//     } catch (err) {
//       throw err;
//     }
//   }
//   return (
//     <>
//       <form
//         id="edit-todo-form"
//         className="flex-group"
//         onSubmit={(ev) => {
//           ev.preventDefault();
//           putUpdateTodo();
//           setEditMode(false);
//         }}
//       >
//         <div className="edit-todo-form__form-group flex-group">
//           <label htmlFor="">Todo Title :</label>
//           <input
//             type="text"
//             value={editedTodo.title}
//             onChange={(ev) =>
//               setEditedTodo((prev) => {
//                 return { ...prev, title: ev.target.value };
//               })
//             }
//           />
//         </div>

//         <div className="edit-todo-form__form-group flex-group">
//           <label>Todo Status: </label>
//           <label
//             className={`${
//               editedTodo.isComplete ? "completed__toggle-wrapper" : ""
//             } toggle-wrapper`}
//           >
//             <input
//               name="check-input"
//               checked={editedTodo.isComplete}
//               onChange={() => {
//                 setEditedTodo((prev) => {
//                   return { ...prev, isComplete: !editedTodo.isComplete };
//                 });
//               }}
//               type="checkbox"
//               className="checkbox-element"
//             />
//             <div className="slider"></div>
//           </label>
//         </div>

//         <div className="edit-todo-form__form-group flex-group">
//           <label>Labels: </label>
//           <ChipsList
//             chips={allLabels}
//             clickable={true}
//             selectedChips={editedTodo.labels}
//             onChipClick={(chip) => {
//               const newChips = curChips.includes(chip)
//                 ? curChips.filter((item) => item !== chip)
//                 : [...curChips, chip];
//               setEditedTodo((prev) => {
//                 return { ...prev, labels: newChips };
//               });
//             }}
//           />
//         </div>

//         <div className="edit-todo-form__form-group flex-group">
//           <label htmlFor="edit-todo-form__description">Description :</label>
//           <textarea
//             id="edit-todo-form__description"
//             value={editedTodo.description}
//             onChange={(ev) => {
//               setEditedTodo((prev) => {
//                 return {
//                   ...prev,
//                   description: ev.target.value,
//                 };
//               });
//             }}
//           />
//         </div>
//         <button id="submit-edit-todo" className="btn" type="submit">
//           Submit Changes
//         </button>
//       </form>
//     </>
//   );
// }

export const allLabels = ["home", "work", "learnings", "friends", "family"];

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [currentTodo, setCurrentTodo] = useState({});
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  //Sever CRUD:
  async function removeTodoFromServer() {
    try {
      await axios.delete(todosUrl + todoId);
      navigate("/todo", { replace: true });
    } catch (error) {
      throw error;
    }
  }
  async function getTodo() {
    try {
      const { data } = await axios.get(todosUrl + todoId);
      setCurrentTodo(data);
    } catch (err) {
      throw err;
    }
  }
  useEffect(() => {
    try {
      console.log("here");
      getTodo();
    } catch (error) {
      throw error;
    }
  }, [editMode]);
  return (
    <>
      <section id="todo-details-container" className=" flex-group">
        {editMode ? (
          <EditTodoForm
            setEditMode={setEditMode}
            removeTodoFromServer={removeTodoFromServer}
            currentTodo={currentTodo}
          />
        ) : (
          <TodoDetails
            removeTodoFromServer={removeTodoFromServer}
            setEditMode={setEditMode}
            currentTodo={currentTodo}
          />
        )}
      </section>
    </>
  );
}

// add return to todoDetails
//Add snack bars
export default TodoDetailsPage;
