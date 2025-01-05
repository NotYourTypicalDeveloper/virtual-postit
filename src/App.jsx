import "./App.scss";
import { useState, useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Postit from "./components/Postit.jsx";
import { notesReducer, initialNotesState } from "./utils/Reducer.js";

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notesState, dispatch] = useReducer(
    notesReducer,
    JSON.parse(localStorage.getItem("notesState")) || initialNotesState
  );

  // Persist to localStorage on state change
  useEffect(() => {
    localStorage.setItem("notesState", JSON.stringify(notesState));
  }, [notesState]);
  const charLimit = 280;
  const remainingChar = charLimit - noteInput.length;

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput) {
      return;
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
      archived: false,
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
  };

  const dropNoteFn = (e) => {
    e.target.style.left = `${e.pageX - 50}px`;
    e.target.style.top = `${e.pageY - 50}px`;
  };

  const dragOverFn = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div className="app" onDragOver={dragOverFn}>
        <h1 className="app-title">Sticky Notes 📌</h1>

        <form onSubmit={addNote} className="note-form">
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Create a new note.."
            rows="8"
            maxLength={charLimit}
          />

          <button type="submit">Add</button>
        </form>
        <p className="char-limit">{remainingChar} left</p>

        {notesState.map((note) => (
          <Postit
            key={note.id}
            note={note}
            dropNoteFn={dropNoteFn}
            dispatch={dispatch}
          />
        ))}
      </div>
    </>
  );
}

export default App;
