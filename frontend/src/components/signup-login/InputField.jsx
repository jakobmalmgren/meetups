import "./InputField.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
function InputField({ email, password, onEmailChange, onPasswordChange }) {
  return (
    <section className="input">
      <h3 className="input_header">Email</h3>
      <section className="input_wrapper">
        <MdOutlineEmail className="email-icon" />
        <input
          className="inputfield"
          type="email"
          placeholder="Email.."
          value={email}
          onChange={onEmailChange}
        />
      </section>

      <h3 className="input_header">Password</h3>
      <section className="input_wrapper">
        <RiLockPasswordLine className="password-icon" />
        <input
          type="password"
          value={password}
          className="inputfield"
          placeholder="Password.."
          onChange={onPasswordChange}
        />
      </section>
    </section>
  );
}

export default InputField;
