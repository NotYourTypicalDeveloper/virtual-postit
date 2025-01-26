import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";
import { toast } from "react-toastify";
import { handleConfirmation } from "../utils/functions.js";
import { Undo2 } from "lucide-react";

const ArchivedPostIt = ({ note, dispatch }) => {
  const deleteArchivedNote = () => {
    dispatch({ type: "DELETE_NOTE", payload: note });
    toast.success("Successfully deleted archived note!");
  };

  const unarchiveNote = () => {
    dispatch({ type: "UNARCHIVE_NOTE", payload: note });
    toast.success("Successfully unarchived note!");
  };
  return (
    <div className="archived-postit">
      <div className="archived-postit-ctnr1">{note.text}</div>
      <div className="archived-postit-ctnr2">
        <IconOnlyButton
          onClickFn={() =>
            handleConfirmation("Delete this note?", deleteArchivedNote)
          }
          icon={<CloseIcon width="26" height="26" />}
          className="archived-close-btn"
        />
        <IconOnlyButton
          onClickFn={unarchiveNote}
          icon={<Undo2 width="22" height="22" />}
          className="unarchive-btn"
        />
      </div>
    </div>
  );
};

export default ArchivedPostIt;
