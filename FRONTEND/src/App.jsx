import { useReducer, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "./App.scss";
import Navbarv2 from "./components/Navbarv2.jsx";
import { NotesContext, NotesDispatchContext } from "./utils/NotesContext.js";
import { initialNotesState, notesReducer } from "./utils/NotesReducer.js";

import ArchivedNotesDrawer from "./components/ArchivedNotesDrawer.jsx";
import HomePage from "./components/HomePage.jsx";
import LoginRegisterForm from "./components/LoginRegisterForm.jsx";

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
          <div className="global-container">
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
          </div>
          <div className="redirection-container">
            <p>
              ❌ This app is
              <br />
              desktop only! 🖥️
              <br />
              Please use a computer or tablet.👩🏽‍💻
            </p>
          </div>
        </>
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export default App;
