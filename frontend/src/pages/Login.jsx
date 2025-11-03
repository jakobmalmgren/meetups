import "./Login.css";
import Icon from "../components/signup-login/Icon.jsx";
import InputField from "../components/signup-login/InputField.jsx";
import SignupLoginbtn from "../components/signup-login/SignupLoginbtn.jsx";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login-signup/login.js";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/home");

      localStorage.setItem("token", result.token);
      localStorage.setItem("userEmail", JSON.stringify(result.user.email)); // spara användardata
    } else {
      console.log("ERROR!!:", result.error);
      setErrorMsg(result.error);
    }
  };

  return (
    <section className="login">
      <section className="login_upper-wrapper">
        <section className="login_header-wrapper">
          <h2 className="login_header">
            Meetup <span className="login_span">Z</span>
          </h2>
        </section>

        <section className="login_icon-wrapper">
          <Icon></Icon>
        </section>
      </section>
      <section className="login_lower-wrapper">
        <h1 className="login_sec-header">Login</h1>
        <form onSubmit={handleLogin}>
          <InputField
            password={password}
            onEmailChange={(e) => {
              setEmail(e.target.value);
            }}
            onPasswordChange={(e) => {
              setPassword(e.target.value);
            }}
            email={email}
          ></InputField>
          <SignupLoginbtn>Login</SignupLoginbtn>
        </form>

        <section className="login_link-wrapper">
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            signup
          </NavLink>
        </section>
      </section>
      {errorMsg && <p className="login-error">{errorMsg}</p>}
    </section>
  );
}

export default Login;
