import "./App.scss";
import { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import Postit from "./components/Postit.jsx";

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
      return newState;
    }
    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        totalNotes: prevState.notes.length - 1,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      console.log("After DELETE_NOTE ", newState);
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

  const dropNote = (e) => {
    e.target.style.left = `${e.pageX - 50}px`;
    e.target.style.top = `${e.pageY - 50}px`;
  };

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div className="app" onDragOver={dragOver}>
        <h1 className="app-title">
          ✏️ Sticky Notes 📌 ({notesState.totalNotes})
          <span>
            {notesState.totalNotes > 0
              ? `Last note created: ${notesState.lastNoteCreated}`
              : ""}
          </span>
        </h1>

        <form onSubmit={addNote} className="note-form">
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Create a new note.."
            rows="10"
          />

          <button>Add</button>
        </form>

        {notesState.notes.map((note) => (
          <Postit
            key={note.id}
            note={note}
            dropNote={dropNote}
            dispatch={dispatch}
          />
        ))}
      </div>
    </>
  );
}

export default App;
