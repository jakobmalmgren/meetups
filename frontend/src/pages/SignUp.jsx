import "./SignUp.css";
import Icon from "../components/signup-login/Icon.jsx";
import InputField from "../components/signup-login/InputField.jsx";
import SignupLoginbtn from "../components/signup-login/SignupLoginbtn.jsx";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/login-signup/signup.js";

function Signup() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signup(email, password);
    console.log(result);

    if (result.success) {
      navigate("/");
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <section className="sign-up">
      <section className="sign-up_upper-wrapper">
        <section className="sign-up_header-wrapper">
          <h2 className="sign-up_header">
            Meetup <span className="sign-up_span">Z</span>
          </h2>
        </section>

        <section className="sign-up_icon-wrapper">
          <Icon></Icon>
        </section>
      </section>
      <section className="sign-up_lower-wrapper">
        <h1 className="sign-up_sec-header">Sign up</h1>
        <form onSubmit={handleSignUp}>
          <InputField
            onEmailChange={(e) => {
              setEmail(e.target.value);
            }}
            onPasswordChange={(e) => {
              setPassword(e.target.value);
            }}
            email={email}
            password={password}
          ></InputField>
          <SignupLoginbtn>Sign up</SignupLoginbtn>
        </form>

        <section className="sign-up_link-wrapper">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            login
          </NavLink>
        </section>
      </section>
      {errorMsg && <p className="signup-error">{errorMsg}</p>}
    </section>
  );
}

export default Signup;
