import {LeftLayoutTheme1} from "../../layouts";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashBoard=()=>{
   const navigate = useNavigate();

   const HandleClick =()=>{
      navigate(`/user`, { replace: true });
   }
   return(
      <main className="flex">
         <LeftLayoutTheme1 label={"Users"} onClick={HandleClick} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[3%] ">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default AdminDashBoard