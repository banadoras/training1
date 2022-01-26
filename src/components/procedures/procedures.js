import useFirestore from "../firebase/useFirestore";
import Procedure from "./procedure";
import "./procedures.css";

export default function Procedures() {
  const procedures = useFirestore();
  return (
    <div className="cards">
      {procedures.map((procedure, index) => {
        return <Procedure key={procedure.id} procedure={procedure} />;
      })}
    </div>
  );
}
