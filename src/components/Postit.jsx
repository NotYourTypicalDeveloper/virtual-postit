import { useState } from "react";
import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import ArchiveIcon from "./ArchiveIcon.jsx";
import { toast } from "react-toastify";
import ButtonWithIcon from "./ButtonWithIcon.jsx";
import { Check, X } from "lucide-react";

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
            <ButtonWithIcon
              className="cancel-btn"
              clickEvent={() => setIsEditing(false)}
              icon={<X />}
              label="Cancel"
            />
            {/* SAVE BUTTON */}
            <ButtonWithIcon
              className="save-btn"
              clickEvent={handleSave}
              icon={<Check />}
              label="Save"
            />
          </div>
        ) : (
          <p className="note-text-ctnr">{currText}</p>
        )}
      </div>

      <div className="note-container-2">
        {/* DELETE */}
        <IconOnlyButton
          onClickFn={handleDelete}
          icon={<CloseIcon width={26} height={26} />}
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
