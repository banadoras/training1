// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChx_bSsr04yE9JMkekVBl_-FKiEBqB-ss",
  authDomain: "carbon-feat-286400.firebaseapp.com",
  projectId: "carbon-feat-286400",
  storageBucket: "carbon-feat-286400.appspot.com",
  messagingSenderId: "842671891392",
  appId: "1:842671891392:web:ea71de17a6c5c1cebede25",
  measurementId: "G-ERXXQ3PGJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
