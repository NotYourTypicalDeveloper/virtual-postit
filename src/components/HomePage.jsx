import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../utils/functions.js";
import { NotesContext, NotesDispatchContext } from "../utils/NotesContext.js";
import Postit from "./Postit.jsx";

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

  const saveNotetoDB = async (noteData) => {
    const payload = JSON.stringify({
      userId: localStorage.getItem("userID"),
      ...noteData,
    });
    try {
      const res = await fetch("http://localhost:5000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: localStorage.getItem("userToken"),
        },
        body: payload,
      });

      console.log("payload: ", payload);
      console.log("response ==> ", res);

      const data = await res.json();

      if (res.ok) {
        console.log("note saved to DB, new id: ", data._id);
        return data._id;
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Note creation error:", err);
    }
  };

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

    newNote.id = saveNotetoDB(newNote);

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
      <div className="homepage-container" onDragOver={onDragOver}>
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

            <button role="button" aria-label="add new note" type="submit">
              Add
            </button>
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
