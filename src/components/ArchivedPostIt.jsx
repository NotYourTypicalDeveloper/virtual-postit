import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";
import { toast } from "react-toastify";
import { handleConfirmation } from "../utils/functions.js";

const ArchivedPostIt = ({ note, dispatch }) => {
  const deleteArchivedNote = () => {
    dispatch({ type: "DELETE_NOTE", payload: note });
    toast.success("Successfully deleted archived note!");
  };

  return (
    <div className="archived-postit">
      <IconOnlyButton
        tooltipText="Delete note"
        onClickFn={() =>
          handleConfirmation("Delete this note?", deleteArchivedNote)
        }
        icon={<CloseIcon width="26" height="26" />}
        className="archived-close-btn"
      />
      <p> {note.text}</p>
    </div>
  );
};

export default ArchivedPostIt;
