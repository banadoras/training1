import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(
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
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Log in</button>
      </form>
      <p>
        Not a meember? <Link to="/register">Register</Link>
      </p>
      <p>{result}</p>
    </div>
  );
}
