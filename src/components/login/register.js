import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/protected");
      })
      .catch((error) => {
        setResult(error.code + ":" + error.message);
      });
  }

  return (
    <div>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Register</button>
      </form>
      <p>
        Already a member? <Link to="/login">Log in</Link>
      </p>
      <p>{result}</p>
    </div>
  );
}
