import React, {ReactNode} from "react";
interface DashboardLayoutProps {
   leftSide?: ReactNode
   main?: ReactNode
}
const DashboardLayout = (props: DashboardLayoutProps) => {
   return (
      <main className="flex">
         <main className="grow flex-center bg-W">
            {props.main}
         </main>
      </main>
   );
};

export default DashboardLayout;
