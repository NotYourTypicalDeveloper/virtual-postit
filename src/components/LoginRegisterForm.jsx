import { useState } from "react";
import "../LoginRegisterForm.scss";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const LoginRegisterForm = () => {
  const [displayLoginForm, setDisplayLoginForm] = useState(true);

  return (
    <section className="login-register-section">
      <div className="login-register-ctnr">
        <div className="panel left-panel">
          {displayLoginForm ? <LoginForm /> : <RegisterForm />}
        </div>
        <div className="panel right-panel">
          <h1>{displayLoginForm ? "Don't " : "Already "}have an account?</h1>
          <p>
            {displayLoginForm
              ? "Create one so that you can save your notes permanently"
              : "Log in to access your notes"}
          </p>
          <button
            role="button"
            className="userauth-btn ghost"
            onClick={() => setDisplayLoginForm((prevState) => !prevState)}
          >
            {displayLoginForm ? "Register" : "Log in"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginRegisterForm;
