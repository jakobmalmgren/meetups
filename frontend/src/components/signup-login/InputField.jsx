import "./InputField.css";
import SignupLoginbtn from "./SignupLoginbtn.jsx";
function InputField() {
  return (
    <section className="input">
      <h3 className="input_header">Email</h3>
      <input className="inputfield" type="text" placeholder="Email.." />
      <h3 className="input_header">Password</h3>
      <input type="text" className="inputfield" placeholder="Password.." />
      <SignupLoginbtn>Sign up</SignupLoginbtn>
    </section>
  );
}

export default InputField;
