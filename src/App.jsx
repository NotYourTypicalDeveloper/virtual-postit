import "./App.scss";
import "./Drawer.scss";
import { useState, useReducer, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Postit from "./components/Postit.jsx";
import { notesReducer, initialNotesState } from "./utils/Reducer.js";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import ArchivedPostIt from "./components/ArchivedPostIt.jsx";
import NavBar from "./components/Navbar.jsx";

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

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onEnterPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      addNote(e);
    }
  };

  return (
    <>
      <div className="app">
        <NavBar toggleDrawer={toggleDrawer} />
        <main onDragOver={onDragOver}>
          <form onSubmit={addNote} className="note-form">
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={onEnterPress}
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
        </main>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          size="70vw"
          className="drawer"
          style={{ backgroundColor: "rgb(242, 242, 194)" }}
        >
          <h1>Archived</h1>
          <section className="archived-ctnr">
            {notesState
              .filter((note) => note.archived)
              .map((note) => (
                <ArchivedPostIt key={note.id} text={note.text} />
              ))}
          </section>
        </Drawer>
      </div>
    </>
  );
}

export default App;
