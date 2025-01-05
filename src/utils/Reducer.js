export const initialNotesState = [
  {
    id: 1,
    text: "write your notes here",
    rotate: 2,
    archived: false,
    position: { left: 300, top: 300 },
  },
];
export const notesReducer = (prevState, action) => {
  switch (action.type) {
    // ADD NEW NOTE_____
    case "ADD_NOTE": {
      return [
        ...prevState,
        { ...action.payload, position: { left: 400, top: 150 } },
      ];
    }
    // UPDATE EXISTING NOTE_____
    case "UPDATE_NOTE": {
      return prevState.map((note) =>
        note.id === action.payload.id
          ? { ...note, text: action.payload.text }
          : note
      );
    }

    // KEEP TRACK of post-it position on viewport
    case "UPDATE_POSITION": {
      return prevState.map((note) =>
        note.id === action.payload.id
          ? { ...note, position: action.payload.position }
          : note
      );
    }

    // DELETE EXISTING NOTE_____
    case "DELETE_NOTE": {
      return prevState.filter((note) => note.id !== action.payload.id);
    }
    // ARCHIVE NOTE______
    case "ARCHIVE_NOTE": {
      return prevState.map((note) =>
        note.id === action.payload.id
          ? { ...note, archived: action.payload.archived }
          : note
      );
    }
    default:
      return prevState;
  }
};
