import React, { useState } from "react";
import "../../src/NavBar.scss";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { BadgeInfo } from "lucide-react";

const NavBar = ({ toggleDrawer }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = () => {
    setIsInfoOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Sticky Notes</h1>
      </div>
      <div className="navbar-right">
        <button className="navbar-btn" onClick={toggleDrawer}>
          see archived notes
        </button>
        <button className="navbar-btn" onClick={toggleInfo}>
          Guidelines <BadgeInfo />
        </button>
        {isInfoOpen && (
          <div className="info-dropdown">
            <p>Press "ADD" or press CMD + Enter keys to create a note.</p>
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
