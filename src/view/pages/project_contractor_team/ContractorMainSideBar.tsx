
import React from "react";
import { useNavigate } from "react-router-dom";
import LeftLayout from "../../layouts/layoutAdmin_Contractor/LeftLayout";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
const ContractorMainSideBar=()=>{
   const navigate = useNavigate();

   const HandleClick =()=>{
      navigate(`/contractor-request`, { replace: true });
   }
   return(
      <main className="flex">
         <LeftLayout label={"Request"} onClick={HandleClick} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[10%] ">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default ContractorMainSideBar