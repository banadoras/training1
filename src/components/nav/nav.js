import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

export default function Nav({ user }) {
  const navigate = useNavigate();
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/protected">Protected</Link>
      </li>

      {!user && (
        <li>
          <Link to="/login">Login</Link> /<Link to="/register"> Register</Link>
        </li>
      )}
      {user && (
        <li>
          <img
            style={{
              height: "20px",
              width: "20px",
              objectFit: "cover",
              borderRadius: "50%"
            }}
            src={auth.currentUser.photoURL}
            alt="user"
          />{" "}
          Welcome {auth.currentUser.displayName}!
        </li>
      )}
      {user && (
        <li>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              signOut(auth)
                .then(() => {
                  navigate("/");
                })
                .catch((error) => {});
            }}
          >
            Log out
          </Link>
        </li>
      )}
    </ul>
  );
}
