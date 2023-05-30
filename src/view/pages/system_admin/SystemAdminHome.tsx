import {getAuth, signOut} from "firebase/auth";

const SystemAdminHome=()=>{
   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         await signOut(authInstance);
         console.log('Sign out successful');
      } catch (error) {
         console.error('Sign out error:', error);
      }
   };
   return(
      <>
         System Admin
         <button onClick={handleSignOut}>Sign Out</button>
      </>

   )
}
export default SystemAdminHome