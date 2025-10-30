import "./SignUp.css";
import Icon from "./Icon.jsx";
import InputField from "./InputField.jsx";
import { Link } from "react-router-dom";
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
        {/* <Link to="/login">Login</Link> */}
        <section className="sign-up_link-wrapper">
          <a className="sign-up_link" href="">
            Login
          </a>
        </section>
      </section>
    </section>
  );
}

export default Signup;
