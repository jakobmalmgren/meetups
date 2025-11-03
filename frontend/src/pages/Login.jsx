import "./Login.css";
import Icon from "../components/signup-login/Icon.jsx";
import InputField from "../components/signup-login/InputField.jsx";
import SignupLoginbtn from "../components/signup-login/SignupLoginbtn.jsx";

import { NavLink } from "react-router-dom";
function Login() {
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
        <InputField></InputField>
        <SignupLoginbtn>Login</SignupLoginbtn>

        <section className="login_link-wrapper">
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            signup
          </NavLink>
        </section>
      </section>
    </section>
  );
}

export default Login;
