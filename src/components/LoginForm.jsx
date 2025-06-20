import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("data from loginForm : ", data);
      if (res.ok) {
        localStorage.setItem("userID", data.userID);
        localStorage.setItem("userToken", data.token);
        setTimeout(() => {
          location.href = "/";
        }, 2000);
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <a href="#">Forgot your password?</a>
      <button role="button" className="userauth-btn">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
