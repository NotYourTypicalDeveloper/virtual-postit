import { useState } from "react";

const Postit = ({ note, dropNoteFn, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currText, setCurrText] = useState(note.text);

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div
      className="note"
      style={{ transform: `rotate(${note.rotate}deg)` }}
      draggable="true"
      onDragEnd={dropNoteFn}
    >
      <div
        onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}
        className="close-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isEditing ? (
        <div className="edit-note-wrapper">
          <textarea
            className="edit-input"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
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
          <button
            className="action-btn2 save-btn"
            onClick={() => {
              dispatch({
                type: "UPDATE_NOTE",
                payload: { id: note.id, text: currText },
              });
              setIsEditing(false);
            }}
          >
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
        <pre className="text">{currText}</pre>
      )}

      <div className="edit-btn" onClick={onEditClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
    </div>
  );
};

export default Postit;
