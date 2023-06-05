import LeftLayout from "../../layouts/layoutAdmin_Contractor/LeftLayout";
import {Header} from "../../layouts";
import { Outlet } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMainSideBar=()=>{
   const navigate = useNavigate();

   const HandleClick =()=>{
      navigate(`/user`, { replace: true });
   }
   return(
      <main className="flex">
         <LeftLayout label={"Users"} onClick={HandleClick} />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[10%] ">
               <Outlet />
            </div>
         </main>
      </main>
   )
}
export default AdminMainSideBar