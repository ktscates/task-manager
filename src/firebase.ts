import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB1zNtEDPbcaloxmJtZ4NrCDibC0dFxIk",
  authDomain: "task-manager-9364a.firebaseapp.com",
  projectId: "task-manager-9364a",
  storageBucket: "task-manager-9364a.appspot.com",
  messagingSenderId: "864657656752",
  appId: "1:864657656752:web:968d3fb90d3aaba3cca475",
  measurementId: "G-1LHGXB15LV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
