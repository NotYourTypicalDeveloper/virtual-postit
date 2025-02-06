import React, { useContext, useState } from "react";
import "../../src/NavBar.scss";
import { BadgeInfo } from "lucide-react";
import { toast } from "react-toastify";
import { handleConfirmation } from "../utils/functions.js";
import { NotesContext, NotesDispatchContext } from "../utils/NotesContext.js";
import Guidelines from "./Guidelines.jsx";

const NavBar = ({ toggleDrawer }) => {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  // const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);

  const numberOfArchivedNotes = notesState.filter(
    (note) => note.archived
  ).length;

  const toggleGuidelines = () => {
    setIsGuidelinesOpen((prevState) => !prevState);
  };

  // const toggleLoginForm = () => {};

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
          login / logout
        </button>
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
        {isGuidelinesOpen && (
          <div className="info-overlay" onClick={toggleGuidelines}>
            <Guidelines />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
