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
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                height: "40px",
                borderRadius: "5px",
                marginRight: "10px"
              }}
              src={auth.currentUser.photoURL}
              alt="user"
            />{" "}
            <p>Welcome {auth.currentUser.displayName}!</p>
          </div>
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
