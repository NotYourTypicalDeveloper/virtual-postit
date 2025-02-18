import LoginSocialIcons from "./LoginSocialIcons.jsx";

const RegisterForm = () => {
  return (
    <form className="auth-form" action="#">
      <h1>Create Account</h1>
      <LoginSocialIcons />
      <span>or use your email for registration</span>

      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="userauth-btn">Register</button>
    </form>
  );
};

export default RegisterForm;
