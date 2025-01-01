import "./App.scss";
import { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import Postit from "./components/Postit.jsx";

const initialNotesState = [
  {
    id: 1,
    text: "Store all your notes on this virtual dashboard!",
    rotate: 12,
  },
];
const notesReducer = (prevState, action) => {
  switch (action.type) {
    // ADD NEW NOTE_____
    case "ADD_NOTE": {
      const newState = [...prevState, action.payload];
      return newState;
    }
    // UPDATE EXISTING NOTE_____
    case "UPDATE_NOTE": {
      const indexToReplace = prevState.findIndex(
        (elem) => elem.id === action.payload.id
      );

      if (indexToReplace === -1) {
        console.warn("No note found with the given id.");
        return prevState;
      }

      const prevStateNotesSplice = [...prevState];
      const newState = prevStateNotesSplice.splice(indexToReplace, 1, {
        ...prevState[indexToReplace],
        text: action.payload.text,
      });
      return newState;
    }
    // DELETE EXISTING NOTE_____
    case "DELETE_NOTE": {
      const newState = prevState.filter(
        (note) => note.id !== action.payload.id
      );
      return newState;
    }
  }
};

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput) {
      return;
    }
    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
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
        <h1 className="app-title">✏️ Sticky Notes 📌</h1>

        <form onSubmit={addNote} className="note-form">
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Create a new note.."
            rows="10"
          />

          <button>Add</button>
        </form>

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
