import "./App.scss";
import "react-modern-drawer/dist/index.css";
import { useState, useReducer } from "react";
import { notesReducer, initialNotesState } from "./utils/NotesReducer.js";
import { ToastContainer, Slide } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { NotesContext, NotesDispatchContext } from "./utils/NotesContext.js";
import Navbarv2 from "./components/Navbarv2.jsx";

import HomePage from "./components/HomePage.jsx";
import LoginRegisterForm from "./components/LoginRegisterForm.jsx";
import ArchivedNotesDrawer from "./components/ArchivedNotesDrawer.jsx";

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
          <Navbarv2 toggleDrawer={toggleDrawer} />
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

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login-or-register" element={<LoginRegisterForm />} />
          </Routes>
          <ArchivedNotesDrawer
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
        </>
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export default App;
