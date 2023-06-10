
import React from "react";
import { useNavigate } from "react-router-dom";
import {LeftLayoutTheme2} from "../../layouts";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
const SupplyDashBoard=()=>{
   const navigate = useNavigate();
   const HandleContract =()=>{
      navigate(`/supply_contract`, { replace: true });
   }
   const HandleRequest =()=>{
      navigate(`supply_allrequest`, { replace: true });
   }

   return(
      <main className="flex">
         <LeftLayoutTheme2 label1={"Contracts"} label2={"Requests"} onClick1={HandleContract} onClick2={HandleRequest} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[3%]">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default SupplyDashBoard