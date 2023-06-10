
import React from "react";
import { useNavigate } from "react-router-dom";
import {LeftLayoutTheme1} from "../../layouts";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
const ContractorDashBoard=()=>{
   const navigate = useNavigate();
   const HandleClick =()=>{
      navigate(`/contractor_allrequest`, { replace: true });
   }
   return(
      <main className="flex">
         <LeftLayoutTheme1 label={"Request"} onClick={HandleClick} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[3%] ">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default ContractorDashBoard