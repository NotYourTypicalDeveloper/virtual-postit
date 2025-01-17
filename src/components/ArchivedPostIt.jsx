import IconOnlyButton from "./IconOnlyButton.jsx";
import CloseIcon from "./CloseIcon.jsx";

const ArchivedPostIt = ({ note, dispatch }) => {
  return (
    <div className="archived-postit">
      <IconOnlyButton
        tooltipText="Delete note"
        onClickFn={() => dispatch({ type: "DELETE_NOTE", payload: note })}
        icon={<CloseIcon width="26" height="26" />}
        className="archived-close-btn"
      />

      {note.text}
    </div>
  );
};

export default ArchivedPostIt;
