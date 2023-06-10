import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
   return (
      <main className="flex">
         <main className="h-[100vh] grow flex-center bg-W">
               <Outlet />
         </main>
      </main>
   );
};

export default MainLayout;
