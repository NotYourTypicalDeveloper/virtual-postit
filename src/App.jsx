import "./App.scss";
import "./Drawer.scss";
import { useState, useReducer } from "react";
import { notesReducer, initialNotesState } from "./utils/NotesReducer.js";
import "react-modern-drawer/dist/index.css";
import { ToastContainer, Slide, toast } from "react-toastify";

import { NotesContext, NotesDispatchContext } from "./utils/NotesContext.js";
import NavBar from "./components/Navbar.jsx";
import DashboardPage from "./components/DashboardPage.jsx";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };
  const [notesState, dispatch] = useReducer(
    notesReducer,
    JSON.parse(localStorage.getItem("notesState")) || initialNotesState
  );

  return (
    <NotesContext.Provider value={notesState}>
      <NotesDispatchContext.Provider value={dispatch}>
        <>
          <NavBar toggleDrawer={toggleDrawer} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
          <DashboardPage
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
        </>
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export default App;
