import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { Undo2 } from "lucide-react";

const Guidelines = () => {
  return (
    <div className="info-dropdown">
      <p>
        Click <b>ADD</b> or press <b>CMD + Enter</b> keys to create a note.
      </p>
      <p>Drag and drop post its to place them anywhere on the dashboard.</p>
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
  );
};

export default Guidelines;
