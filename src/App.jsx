import "./App.scss";
import { useState, useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Postit from "./components/Postit.jsx";
import { notesReducer, initialNotesState } from "./utils/Reducer.js";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notesState, dispatch] = useReducer(
    notesReducer,
    JSON.parse(localStorage.getItem("notesState")) || initialNotesState
  );
  const [isOpen, setIsOpen] = useState(false);

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
    setNoteInput("");
  };

  const dragOverFn = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  console.log(notesState.filter((note) => note.archived));

  return (
    <>
      <div className="app" onDragOver={dragOverFn}>
        <button onClick={toggleDrawer}>Show archived notes</button>

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

        {notesState
          .filter((note) => !note.archived)
          .map((note) => (
            <Postit key={note.id} note={note} dispatch={dispatch} />
          ))}

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <h1>Archived</h1>
          {notesState
            .filter((note) => note.archived)
            .map((note) => (
              <p> {note.text} </p>
            ))}
          ABC
        </Drawer>
      </div>
    </>
  );
}

export default App;
