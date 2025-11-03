import "./SignUp.css";
import Icon from "../components/signup-login/Icon.jsx";
import InputField from "../components/signup-login/InputField.jsx";
import SignupLoginbtn from "../components/signup-login/SignupLoginbtn.jsx";

import { NavLink } from "react-router-dom";
function Signup() {
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
        <InputField></InputField>
        <SignupLoginbtn>Sign up</SignupLoginbtn>

        <section className="sign-up_link-wrapper">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            login
          </NavLink>
        </section>
      </section>
    </section>
  );
}

export default Signup;
