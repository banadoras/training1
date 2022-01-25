import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useStorage from "../firebase/useStorage";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./register.css";

export default function Register() {
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const { url, error, progress } = useStorage(file);

  const navigate = useNavigate();

  async function saveUserToFirestore(person, id) {
    await setDoc(doc(db, "people", id), {
      name: person.name,
      email: person.email,
      password: person.password,
      photo: person.photo
    });
  }

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
        const person = {
          name: e.target.name.value,
          email: e.target.email.value,
          password: "******",
          photo: url
        };
        saveUserToFirestore(person, userCredential.user.uid);
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
    <div className="register">
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          }
          alt="profile"
        />
        <label htmlFor="file-photo">Upload Photo</label>
        <input
          id="file-photo"
          type="file"
          name="photo"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div>
          <progress
            max="100"
            value={isNaN(progress) ? 0 : progress * 100}
          ></progress>
        </div>
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
