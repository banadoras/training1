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

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
        <Route path="/protected" element={user ? <Protected /> : <Login />} />
      </Routes>
    </div>
  );
}
