export const initialNotesState = [
  {
    id: 1,
    text: "write your notes here",
    rotate: 7,
    archived: false,
  },
];
export const notesReducer = (prevState, action) => {
  switch (action.type) {
    // ADD NEW NOTE_____
    case "ADD_NOTE": {
      const newState = [...prevState, action.payload];
      return newState;
    }
    // UPDATE EXISTING NOTE_____
    case "UPDATE_NOTE": {
      const indexToReplace = prevState.findIndex(
        (elem) => elem.id === action.payload.id
      );

      const prevStateNotesSplice = [...prevState];
      prevStateNotesSplice.splice(indexToReplace, 1, {
        ...prevState[indexToReplace],
        text: action.payload.text,
      });
      return prevStateNotesSplice;
    }
    // DELETE EXISTING NOTE_____
    case "DELETE_NOTE": {
      const newState = prevState.filter(
        (note) => note.id !== action.payload.id
      );
      return newState;
    }

    case "ARCHIVE_NOTE": {
      const indexToReplace = prevState.findIndex(
        (elem) => elem.id === action.payload.id
      );

      const prevStateNotesSplice = [...prevState];
      prevStateNotesSplice.splice(indexToReplace, 1, {
        ...prevState[indexToReplace],
        archived: action.payload.archived,
      });
      return prevStateNotesSplice;
    }
  }
};
