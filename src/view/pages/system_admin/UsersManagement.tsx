import {Button, Text} from "../../base_components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FaTrashAlt} from "react-icons/fa";
import {useState, useEffect} from "react";
import {child, get, getDatabase, ref, remove} from "firebase/database";
import {database, auth} from "../../../configs/FirebaseConfig";
import {CreateNewBtn} from "../../components";
import {AddNewUser} from "./index";

type UserData = {
   uid: string;
   email: string;
   password: string;
   role: string;
};

const UsersManagement = () => {
   const [data, setData] = useState<{ [key: string]: UserData }>({});
   const [showModal, setShowModal] = useState<boolean>(false);
   // console.log(data)
   useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, `users`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               setData(snapshot.val());
            } else {
               throw new Error("No data available");
            }
         })
         .catch((error) => {
            throw new Error(error);
         });
   }, [data]);

   const openModal = () => {
      setShowModal(true);
   };
   const handleDeleteUser = async (uid:string) => {
      try {
         const userRef = ref(database, `users/${uid}`);
         await remove(userRef);
      } catch (error) {
         console.error('Lỗi khi xóa người dùng:', error);
      }
   };
   return (
      <div className={`${style.wrapper}`}>
         <CreateNewBtn wrapperStyles={`${style.btnCreate}`} onClick={openModal}/>
         {showModal && <AddNewUser closeModal={() => setShowModal(false)}/>}
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow className="bg-G shadow-md">
                     <TableCell>
                        <Text weight={"bold"} color={"white"}>Email</Text>
                     </TableCell>
                     <TableCell>
                        <Text weight={"bold"} color={"white"}>Password</Text>
                     </TableCell>
                     <TableCell>
                        <Text weight={"bold"} color={"white"}>Team</Text>
                     </TableCell>
                     <TableCell>
                        <Text weight={"bold"} color={"white"}>Actions</Text>
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {Object.keys(data).map((uid) => (
                     <TableRow key={uid}>
                        <TableCell component="th" scope="row">
                           {data[uid].email}
                        </TableCell>
                        <TableCell>{data[uid].password}</TableCell>
                        <TableCell>{data[uid].role}</TableCell>
                        <TableCell>
                           <Button
                              iconLeft={<FaTrashAlt size={25}/>}
                              label=""
                              onClick={() => handleDeleteUser(uid)}
                              {...style.button}
                           />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};


const style = {
   wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
   button: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: "py-0 px-0 left-[8%]"
   },
   btnCreate: "left-[0%]",
}
export default UsersManagement

