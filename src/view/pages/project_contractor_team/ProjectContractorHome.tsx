import {getAuth, signOut} from "firebase/auth";
import {ContractorRequest,ContractorLeftSideBar} from "./index";
import React from "react";

const ProjectContractorHome =()=>{
   return(
      <main className={`flex flex-row w-full h-[100vh]`}>
         <ContractorLeftSideBar/>
         <ContractorRequest/>
      </main>
   )
}
export default ProjectContractorHome