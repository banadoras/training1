import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Nav from "./components/nav/nav";
import "./styles.css";
import { auth } from "./components/firebase/firebase";
import Landing from "./components/landing/landing";
import Protected from "./components/protected/protected";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/firebase/firebase";
import Details from "./components/procedureDetails/details";
import AddProcedure from "./components/addProcedure/addProcedure";

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedinUser, setLoggedinUser] = useState(null);

  async function getLoggedinUserData(id) {
    getDoc(doc(db, "people", id)).then((docSnap) => {
      if (docSnap.exists()) {
        //setUser(docSnap.data());
        setLoggedinUser(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getLoggedinUserData(user.uid);
      } else {
        setUser(null);
        //setLoggedinUser(null)
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/add" element={<AddProcedure />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/protected"
          element={
            user ? (
              <Protected loggedinUser={loggedinUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/procedures/:id"
          element={user ? <Details /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<h1>Error 404: Page not found</h1>} />
      </Routes>
    </div>
  );
}
