import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const PlanerHome =()=>{
   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         await signOut(authInstance);
         console.log('Sign out successful');
      } catch (error) {
         console.error('Sign out error:', error);
      }
   };
   return (
      <>
         Planner Team
         <>
            <p>{`Signed In as `}</p>
            <button onClick={handleSignOut}>Sign Out</button>
         </>
      </>

   )

}
export default PlanerHome