import { useReducer, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "./App.scss";
import Navbarv2 from "./components/NavBar/Navbarv2.jsx";
import { NotesContext, NotesDispatchContext } from "./utils/NotesContext.js";
import { initialNotesState, notesReducer } from "./utils/NotesReducer.js";

import ArchivedNotesDrawer from "./components/Archive Drawer/ArchivedNotesDrawer.jsx";
import LoginRegisterForm from "./components/Login/LoginRegisterForm.jsx";
import HomePage from "./components/Main Dashboard/HomePage.jsx";
import LazyBackgroundImage from "./components/Shared/LazyBackgroundImage.jsx";

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
          <LazyBackgroundImage
            className="global-container"
            alt="creative woden workspace"
            placeholder="../src/assets/wooden-desk-blur.avif" // a tiny 20–50px wide AVIF or PNG
            srcSet="../src/assets/wooden-desk-1920.avif 1920w, ../src/assets/wooden-desk-2560.avif 2560w, ../src/assets/wooden-desk-3840.avif 3840w"
            fallback="../src/assets/wooden-desk-1920.avif"
          >
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
          </LazyBackgroundImage>

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
