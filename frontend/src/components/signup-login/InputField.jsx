import "./InputField.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
function InputField() {
  return (
    <section className="input">
      <h3 className="input_header">Email</h3>
      <section className="input_wrapper">
        <MdOutlineEmail className="email-icon" />
        <input className="inputfield" type="text" placeholder="Email.." />
      </section>

      <h3 className="input_header">Password</h3>
      <section className="input_wrapper">
        <RiLockPasswordLine className="password-icon" />
        <input type="text" className="inputfield" placeholder="Password.." />
      </section>
    </section>
  );
}

export default InputField;
