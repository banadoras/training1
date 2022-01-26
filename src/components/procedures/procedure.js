import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/errorContext";
import "./procedure.css";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Procedure({ procedure }) {
  const navigate = useNavigate();
  const [error, setError] = useContext(ErrorContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        //setLoggedinUser(null)
      }
    });
  }, []);

  return (
    <div className="card">
      <img src={procedure.urls[0]} alt="proc" />
      <h4>{procedure.title}</h4>
      <p>{procedure.description}</p>
      <button
        to={"/procedures/" + procedure.id}
        onClick={(e) => {
          e.preventDefault();
          if (user) {
            setError(null);
          } else {
            setError({
              loc: procedure.id,
              message: "Please log in or register first!"
            });
          }
          navigate("/procedures/" + procedure.id);
        }}
      >
        More
      </button>
    </div>
  );
}
