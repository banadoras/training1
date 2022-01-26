import { Link } from "react-router-dom";
import "./procedure.css";

export default function Procedure({ procedure }) {
  return (
    <div className="card">
      <img src={procedure.urls[0]} alt="proc" />
      <h4>{procedure.title}</h4>
      <p>{procedure.description}</p>
      <Link to={"/procedures/" + procedure.id}>More</Link>
    </div>
  );
}
