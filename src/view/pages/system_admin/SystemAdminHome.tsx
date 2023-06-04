import {getAuth, signOut} from "firebase/auth";
import {AdminLeftSideBar} from "./index";
import {UsersManagement} from "./index";

const SystemAdminHome = () => {
   return (
      <main className={`flex flex-row w-full h-[100vh]`}>
            <AdminLeftSideBar/>
            <UsersManagement/>
      </main>

   )
}
export default SystemAdminHome