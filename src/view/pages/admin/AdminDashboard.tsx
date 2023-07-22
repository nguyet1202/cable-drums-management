import {DashboardLayout} from '../../layout'
import UserManagement from "./UserManagement";

function AdminDashboard() {

   return (
      <DashboardLayout
         main={<UserManagement/>}
      />
   )
}

export default AdminDashboard