import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import "./LoginRegisterForm.scss";
import RegisterForm from "./RegisterForm.jsx";

const LoginRegisterForm = () => {
  const [isLoginFormDisplayed, setIsLoginFormDisplayed] = useState(true);

  return (
    <section className="login-register-section">
      <div className="login-register-ctnr">
        <div className="panel left-panel">
          {isLoginFormDisplayed ? <LoginForm /> : <RegisterForm />}
        </div>
        <div className="panel right-panel">
          <h1>
            {isLoginFormDisplayed ? "Don't " : "Already "}have an account?
          </h1>
          <p>
            {isLoginFormDisplayed
              ? "Create one so that you can save your notes permanently"
              : "Log in to access your notes"}
          </p>
          <button
            role="button"
            class="userauth-btn ghost"
            onClick={() => setIsLoginFormDisplayed((prevState) => !prevState)}
          >
            {isLoginFormDisplayed ? "Register" : "Log in"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginRegisterForm;
