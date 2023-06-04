// RootLayout.tsx
import React from "react";
import LeftLayout from "./LeftLayout";
import {Header} from "./index";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
   return (
      <main className="flex">
         <LeftLayout />
         <main className="h-[100vh] grow flex-center bg-W flex-col">
            <Header/>
            <div className=" mt-[10%] ">
               <Outlet />
            </div>
         </main>
      </main>
   );
};

export default MainLayout;
