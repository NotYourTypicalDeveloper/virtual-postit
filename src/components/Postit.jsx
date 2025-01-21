import { useState } from "react";
import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { toast } from "react-toastify";

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

  // on drag event
  const handleDragEnd = (e) => {
    const viewportWidth = window.innerWidth;

    // Calculate the new horizontal position
    let newLeftPos = e.pageX - 50; // Center the note horizontally
    const newTopPos = e.pageY - 50; // Keep vertical position as-is

    // Check if the post-it is outside the horizontal boundaries
    if (newLeftPos < 0 || newLeftPos > viewportWidth - 250) {
      if (newLeftPos < 0) newLeftPos = 0;
      if (newLeftPos > viewportWidth - 250) newLeftPos = viewportWidth - 350;
    }

    dispatch({
      type: "UPDATE_POSITION",
      payload: {
        id: note.id,
        position: {
          left: newLeftPos,
          top: newTopPos,
        },
      },
    });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: note });
    toast.success("Successfully deleted note!");
  };

  const handleArchive = () => {
    dispatch({ type: "ARCHIVE_NOTE", payload: note });
    toast.success("Successfully archived note!");
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
      <div className="note-container-1">
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
          <p className="note-text-ctnr">{currText}</p>
        )}
      </div>

      <div className="note-container-2">
        {/* DELETE */}
        <IconOnlyButton
          onClickFn={handleDelete}
          icon={<CloseIcon width="24" height="24" />}
          className="close-btn"
        />
        <div className="bottom-buttons-ctnr">
          {/* ARCHIVE */}
          <IconOnlyButton
            onClickFn={handleArchive}
            className="archive-btn"
            icon={<ArchiveIcon />}
          />
          {/* EDIT */}
          <IconOnlyButton
            onClickFn={onEditClick}
            className="edit-btn"
            icon={<EditIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default Postit;
