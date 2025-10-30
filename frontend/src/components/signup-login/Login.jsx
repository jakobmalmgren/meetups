import "./Login.css";
import Icon from "./Icon.jsx";
import InputField from "./InputField.jsx";
import SignupLoginbtn from "./SignupLoginbtn.jsx";

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

        {/* <Link to="/login">Login</Link> */}
        <section className="login_link-wrapper">
          <a className="login_link" href="">
            Sign up
          </a>
        </section>
      </section>
    </section>
  );
}

export default Login;
