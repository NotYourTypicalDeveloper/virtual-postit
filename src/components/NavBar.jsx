import React, { useState } from "react";
import "../../src/NavBar.scss";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { BadgeInfo } from "lucide-react";
import { toast } from "react-toastify";

const NavBar = ({ toggleDrawer, dispatch }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = () => {
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
        <button className="navbar-btn" onClick={resetDashboard}>
          reset dashboard
        </button>
        <button className="navbar-btn" onClick={toggleDrawer}>
          see archived notes
        </button>
        <button className="navbar-btn" onClick={toggleInfo}>
          Guidelines <BadgeInfo />
        </button>
        {isInfoOpen && (
          <div className="info-dropdown">
            <p>Click "ADD" or press CMD + Enter keys to create a note.</p>
            <p>
              Drag and drop post its to place them anywhere on the dashboard.
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
