import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./details.css";

export default function Details() {
  const params = useParams();
  const [procedure, setProcedure] = useState(null);

  function findProcedure() {
    onSnapshot(doc(db, "procedures", String(params.id)), (doc) => {
      console.log("Current data: ", doc.data());
      const proc = {
        title: doc.data().title,
        description: doc.data().description,
        urls: doc.data().urls,
        id: doc.id
      };
      setProcedure(proc);
    });
  }

  useEffect(() => {
    findProcedure();
  }, []);

  return (
    <div className="details">
      {procedure && (
        <div>
          <div className="images">
            {procedure.urls.map((url, index) => {
              return (
                <div key={index}>
                  <img src={url} alt="proc" />
                </div>
              );
            })}
          </div>

          <h4>{procedure.title}</h4>
          <p>{procedure.description}</p>
          <h2>{procedure.id}</h2>
        </div>
      )}
    </div>
  );
}
