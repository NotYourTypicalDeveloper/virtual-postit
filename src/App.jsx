import "./App.scss";
import "react-modern-drawer/dist/index.css";
import { useState, useReducer } from "react";
import { notesReducer, initialNotesState } from "./utils/NotesReducer.js";
import { ToastContainer, Slide } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { NotesContext, NotesDispatchContext } from "./utils/NotesContext.js";
import NavBar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
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

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
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
