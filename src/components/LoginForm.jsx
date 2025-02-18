import LoginSocialIcons from "./LoginSocialIcons.jsx";

const LoginForm = () => {
  return (
    <form className="auth-form" action="#">
      <h1>Log in</h1>
      <LoginSocialIcons />
      <span>or use your account</span>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot your password?</a>
      <button className="userauth-btn">Log In</button>
    </form>
  );
};

export default LoginForm;
