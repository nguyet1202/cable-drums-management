import MainHeader from "./MainHeader";
import {Outlet} from "react-router-dom"

function DashBoardLayout() {
   return (
      <main className="h-[100vh] grow flex-center bg-W flex-col">
         <MainHeader/>
         <div className=" mt-[1%] ">
            <Outlet/>
         </div>
      </main>
   )
}

export default DashBoardLayout