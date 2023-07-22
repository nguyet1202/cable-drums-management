import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
   apiKey: "AIzaSyDXAMVTo5Z05KGgzXHUnC6_Hqz414aWlzk",
   authDomain: "cable-drums-management.firebaseapp.com",
   projectId: "cable-drums-management",
   storageBucket: "cable-drums-management.appspot.com",
   messagingSenderId: "70152274820",
   appId: "1:70152274820:web:7f530ff5fb1497bd7513d1",
   measurementId: "G-6Q3Z0TS05S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export {auth,provider,database}