import { useEffect, useState } from "react";
//import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function useFirestore() {
  const [procedures, setProcedures] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "procedures"));
    onSnapshot(q, (querySnapshot) => {
      const procs = [];
      querySnapshot.forEach((doc) => {
        const proc = {
          title: doc.data().title,
          description: doc.data().description,
          urls: doc.data().urls,
          id: doc.id
        };
        procs.push(proc);
      });
      setProcedures(procs);
    });
  }, []);

  return procedures;
}
