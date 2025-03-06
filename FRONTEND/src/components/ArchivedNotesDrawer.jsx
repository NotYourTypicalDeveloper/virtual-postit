import Drawer from "react-modern-drawer";
import { Trash2 } from "lucide-react";
import "../ArchivedNotesDrawer.scss";
import ArchivedPostIt from "./ArchivedPostIt.jsx";
import ButtonWithIcon from "./ButtonWithIcon.jsx";
import { handleConfirmation } from "../utils/functions.js";
import { useContext } from "react";
import { NotesContext } from "../utils/NotesContext.js";
import { NotesDispatchContext } from "../utils/NotesContext.js";

const ArchivedNotesDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const dispatch = useContext(NotesDispatchContext);
  const notesState = useContext(NotesContext);
  const hasArchivedNotes = notesState.some((elem) => elem.archived === true);

  // DELETE ALL archived notes
  const deleteArchivedNotes = () => {
    dispatch({ type: "DELETE_ALL_ARCHIVED" });
    toast.success("Successfully deleted all archived notes!");
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={toggleDrawer}
      direction="right"
      size="70vw"
      className="drawer"
      style={{ backgroundColor: "rgb(200 204 225)" }}
    >
      <h1>Archived</h1>
      {hasArchivedNotes ? (
        <>
          <ButtonWithIcon
            className="delete-all-btn"
            clickEvent={() =>
              handleConfirmation(
                "Are you sure you want to permanently delete all your archived notes?",
                deleteArchivedNotes
              )
            }
            icon={<Trash2 style={{ marginRight: "10px" }} />}
            label="Delete archived notes"
          />
          <section className="archived-ctnr">
            {notesState
              .filter((note) => note.archived)
              .map((note) => (
                <ArchivedPostIt key={note.id} note={note} />
              ))}
          </section>
        </>
      ) : (
        <p> No archived notes to display.</p>
      )}
    </Drawer>
  );
};

export default ArchivedNotesDrawer;
