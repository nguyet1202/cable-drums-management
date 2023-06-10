
import React from "react";
import { useNavigate } from "react-router-dom";
import {LeftLayoutTheme2} from "../../layouts";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
const PlannerDashBoard=()=>{
   const navigate = useNavigate();
   const HandleContract =()=>{
      navigate(`/contract`, { replace: true });
   }
   const HandleRequest =()=>{
      navigate(`/allrequest`, { replace: true });
   }

   return(
      <main className="flex">
         <LeftLayoutTheme2 label1={"Contracts"} label2={"Requests"} onClick1={HandleContract} onClick2={HandleRequest} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[3%] ">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default PlannerDashBoard