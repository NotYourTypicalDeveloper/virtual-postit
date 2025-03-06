const RegisterForm = () => {
  return (
    <form className="auth-form" action="#">
      <h1>Create Account</h1>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button role="button" className="userauth-btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
