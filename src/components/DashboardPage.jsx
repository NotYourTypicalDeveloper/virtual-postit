import { v4 as uuid } from "uuid";
import Drawer from "react-modern-drawer";
import { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import Postit from "./Postit.jsx";
import ArchivedPostIt from "./ArchivedPostIt.jsx";
import ButtonWithIcon from "./ButtonWithIcon.jsx";
import {
  handleConfirmation,
  generateRandomNumber,
} from "../utils/functions.js";
import { NotesContext, NotesDispatchContext } from "../utils/NotesContext.js";

const DashboardPage = ({ isDrawerOpen, toggleDrawer }) => {
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

  // DELETE ALL archived notes
  const deleteArchivedNotes = () => {
    dispatch({ type: "DELETE_ALL_ARCHIVED" });
    toast.success("Successfully deleted all archived notes!");
  };

  const hasArchivedNotes = notesState.some((elem) => elem.archived === true);

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
          <Drawer
            open={isDrawerOpen}
            onClose={toggleDrawer}
            direction="right"
            size="70vw"
            className="drawer"
            style={{ backgroundColor: "rgba(233, 220, 204, 1)" }}
          >
            <h1>Archived</h1>
            {hasArchivedNotes ? (
              <>
                <ButtonWithIcon
                  className="delete-all-btn"
                  clickEvent={() =>
                    handleConfirmation(
                      "Are you sure you want to permanently delete all your archived notes?",
                      deleteArchivedNotes
                    )
                  }
                  icon={<Trash2 style={{ marginRight: "10px" }} />}
                  label="Delete archived notes"
                />
                <section className="archived-ctnr">
                  {notesState
                    .filter((note) => note.archived)
                    .map((note) => (
                      <ArchivedPostIt key={note.id} note={note} />
                    ))}
                </section>
              </>
            ) : (
              <p> No archived notes to display.</p>
            )}
          </Drawer>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
