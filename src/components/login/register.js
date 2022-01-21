import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useStorage from "../firebase/useStorage";
import storeUserPhoto from "../firebase/storePhoto";

export default function Register() {
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const { url, error, progress } = useStorage(file);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    //const { url, error, progress } = storeUserPhoto(file);
    console.log(url);

    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        //const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: e.target.name.value,
          photoURL: url
        })
          .then(() => {
            navigate("/protected");
          })
          .catch((e) => {
            setResult(e);
          });
      })
      .catch((error) => {
        setResult(error.code + ":" + error.message);
      });
  }

  return (
    <div>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <p>{error}</p>
        <input type="text" name="name" placeholder="Name" />
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
