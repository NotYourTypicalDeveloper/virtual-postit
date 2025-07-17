import { BadgeInfo } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleConfirmation } from "../../utils/functions.js";
import {
  NotesContext,
  NotesDispatchContext,
} from "../../utils/NotesContext.js";
import WeatherWidget from "../Weather Feature/WeatherWidget.jsx";
import Guidelines from "./Guidelines.jsx";
import "./NavBar.scss";

const Navbarv2 = ({ toggleDrawer }) => {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);

  const numberOfArchivedNotes = notesState.filter(
    (note) => note.archived
  ).length;

  const toggleGuidelines = () => {
    setIsGuidelinesOpen((prevState) => !prevState);
  };

  // Delete all current notes
  const resetDashboard = () => {
    dispatch({ type: "RESET_DASHBOARD" });
    toast.success("Successfully deleted all notes from dashboard!");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">
          Virtual Post-its
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/login-or-register" className="navbar-btn">
          login / logout
        </Link>
        <button role="button" className="navbar-btn" onClick={toggleDrawer}>
          see archived notes ({numberOfArchivedNotes})
        </button>
        <button
          role="button"
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
        <button role="button" className="navbar-btn" onClick={toggleGuidelines}>
          Guidelines <BadgeInfo />
        </button>
        {isGuidelinesOpen && (
          <div className="info-overlay" onClick={toggleGuidelines}>
            <Guidelines />
          </div>
        )}
        <WeatherWidget />
      </div>
    </nav>
  );
};

export default Navbarv2;
