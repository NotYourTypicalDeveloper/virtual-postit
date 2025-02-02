import React, { useContext, useState } from "react";
import "../../src/NavBar.scss";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { BadgeInfo, Undo2 } from "lucide-react";
import { toast } from "react-toastify";
import { handleConfirmation } from "../utils/functions.js";
import { NotesContext, NotesDispatchContext } from "../utils/NotesContext.js";

const NavBar = ({ toggleDrawer }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);

  const numberOfArchivedNotes = notesState.filter(
    (note) => note.archived
  ).length;
  const toggleGuidelines = () => {
    setIsInfoOpen((prevState) => !prevState);
  };

  // Delete all current notes
  const resetDashboard = () => {
    dispatch({ type: "RESET_DASHBOARD" });
    toast.success("Successfully deleted all notes from dashboard!");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Virtual Post-its</h1>
      </div>
      <div className="navbar-right">
        <button className="navbar-btn" onClick={toggleDrawer}>
          see archived notes ({numberOfArchivedNotes})
        </button>
        <button
          className="navbar-btn"
          onClick={() =>
            handleConfirmation(
              "Are you sure you want to permanently delete all your current notes?",
              resetDashboard
            )
          }
        >
          reset dashboard
        </button>
        <button className="navbar-btn" onClick={toggleGuidelines}>
          Guidelines <BadgeInfo />
        </button>
        {isInfoOpen && (
          <div className="info-overlay" onClick={toggleGuidelines}>
            <div className="info-dropdown">
              <p>
                Click <b>ADD</b> or press <b>CMD + Enter</b> keys to create a
                note.
              </p>
              <p>
                Drag and drop post its to place them anywhere on the dashboard.
              </p>
              <p>
                Delete all your current notes by clicking <b>reset dashboard</b>
              </p>
              <p>
                Delete all your archived notes by clicking
                <b>delete archived notes</b>
              </p>
              <p>Commands: </p>

              <div className="info-item">
                <CloseIcon />
                <span>Delete note</span>
              </div>
              <div className="info-item">
                <EditIcon />
                <span>Edit Note</span>
              </div>
              <div className="info-item">
                <ArchiveIcon />
                <span>Archive Note</span>
              </div>
              <div className="info-item">
                <Undo2 /> <span>Unarchive (restore) Note</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
