import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import Postit from "./Postit.jsx";
import { generateRandomNumber } from "../utils/functions.js";
import { NotesContext, NotesDispatchContext } from "../utils/NotesContext.js";

const HomePage = () => {
  const [noteInput, setNoteInput] = useState("");
  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);

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
      rotate: generateRandomNumber(-4, 12),
      archived: false,
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    setNoteInput("");
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // user presses CMD + Enter key to create a new note
  const onEnterPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      addNote(e);
    }
  };

  return (
    <>
      <div className="app" onDragOver={onDragOver}>
        <main>
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
              <Postit key={note.id} note={note} />
            ))}
        </main>
      </div>
    </>
  );
};

export default HomePage;
