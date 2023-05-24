import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import {database} from "./configs/FirebaseConfig";
import {SignIn} from "./view";
function App() {
   const dbRef = ref(database);
   get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
         console.log(snapshot.val());
      } else {
         console.log("No data available");
      }
   }).catch((error) => {
      console.error(error);
   });
   return (
      <SignIn/>
   );
}

export default App;
