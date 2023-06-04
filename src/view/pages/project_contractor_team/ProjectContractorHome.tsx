import {getAuth, signOut} from "firebase/auth";

const ProjectContractorHome =()=>{
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
      <>Project Contractor
         <>
            <p>{`Signed In as `}</p>
            <button onClick={handleSignOut}>Sign Out</button>
         </>
      </>
   )
}
export default ProjectContractorHome