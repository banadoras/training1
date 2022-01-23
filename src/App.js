import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Nav from "./components/nav/nav";
import "./styles.css";
import { auth } from "./components/firebase/firebase";
import Landing from "./components/landing/landing";
import Protected from "./components/protected/protected";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/firebase/firebase";

export default function App() {
  const [user, setUser] = useState(null);

  async function getLoggedinUserData(id) {
    getDoc(doc(db, "people", String(id))).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getLoggedinUserData(user.uid)
          .then((loggedinUser) => {
            setUser(loggedinUser);
            console.log(loggedinUser);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/protected"
          element={user ? <Protected loggedinUser={user} /> : <Login />}
        />
      </Routes>
    </div>
  );
}
