import { BadgeInfo } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleConfirmation } from "../../utils/functions.js";
import {
  NotesContext,
  NotesDispatchContext,
} from "../../utils/state mgmt/NotesContext.js";
import DropdownButton from "../Buttons/DropdownButton.jsx";
import Guidelines from "../NavBar/Guidelines.jsx";
import WeatherWidget from "../Weather Feature/WeatherWidget.jsx";
import "./NavBar.scss";

const Navbarv2 = ({ toggleDrawer }) => {
  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);

  const numberOfArchivedNotes = notesState.filter(
    (note) => note.archived
  ).length;

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
        <div>
          <DropdownButton
            label="Guidelines"
            icon={<BadgeInfo />}
            modalContent={<Guidelines />}
          />
        </div>
        <WeatherWidget />
      </div>
    </nav>
  );
};

export default Navbarv2;
