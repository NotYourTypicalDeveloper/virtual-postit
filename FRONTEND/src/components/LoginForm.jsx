const LoginForm = () => {
  return (
    <form className="auth-form" action="#">
      <h1>Log in</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot your password?</a>
      <button role="button" className="userauth-btn">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
