import { useState } from "react";
import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";

const Postit = ({ note, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currText, setCurrText] = useState(note.text);

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: { id: note.id, text: currText },
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  const onArchiveClick = (noteId) => {
    alert("archive clicked ");
    dispatch({
      type: "ARCHIVE_NOTE",
      payload: { id: noteId, archived: true },
    });
  };

  // on drag event
  const handleDragEnd = (e) => {
    dispatch({
      type: "UPDATE_POSITION",
      payload: {
        id: note.id,
        position: {
          left: e.pageX - 50,
          top: e.pageY - 50,
        },
      },
    });
  };

  return (
    <div
      className="note"
      style={{
        transform: `rotate(${note.rotate}deg)`,
        position: "absolute",
        left: note.position.left || 0,
        top: note.position.top || 0,
        cursor: "grab",
      }}
      draggable="true"
      onDragEnd={handleDragEnd}
    >
      <IconOnlyButton
        tooltipText="Delete note"
        onClickFn={() => dispatch({ type: "DELETE_NOTE", payload: note })}
        icon={<CloseIcon />}
        className="close-btn"
      />
      {/* User EDIT */}
      {isEditing ? (
        <div className="edit-note-wrapper">
          <textarea
            className="edit-input"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />

          {/* CANCEL BUTTON */}
          <button
            className="action-btn2 cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </button>

          {/* SAVE BUTTON */}
          <button className="action-btn2 save-btn" onClick={handleSave}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            Save
          </button>
        </div>
      ) : (
        <div className="note-text-ctnr">{currText}</div>
      )}

      {/* ARCHIVE and EDIT Note buttons */}
      <IconOnlyButton
        tooltipText="Archive note"
        onClickFn={() => dispatch({ type: "ARCHIVE_NOTE", payload: note })}
        className="archive-btn"
        icon={<ArchiveIcon />}
        tooltipID="archive"
        tooltipPosition="top"
      />
      <IconOnlyButton
        tooltipText="Edit note"
        onClickFn={onEditClick}
        className="edit-btn"
        icon={<EditIcon />}
        tooltipID="edit"
        tooltipPosition="top"
      />
    </div>
  );
};

export default Postit;
