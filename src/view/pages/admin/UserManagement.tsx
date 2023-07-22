import * as React from 'react';
import {useState} from "react";
import Box from '@mui/material/Box';
import useGetData from "../../../hooks/useGetData";
import {Loading} from "../../base_components";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {HeaderTable} from "../../components/data_display";

type UserData = {
   uid: string;
   email: string;
   name: string;
   role: string;
   createAt: string;
};

const UserManagement = () => {

   const [data, setData] = useState<{ [key: string]: UserData }>({});
   const getDataUser = useGetData('users', (snapshot) => {
      if (snapshot.exists()) {
         setData(snapshot.val());
      } else {
         console.log('No data available');
      }
   });

   if (getDataUser) {
      return (
         <Loading/>
      );
   }

   const rows = Object.keys(data).map((key, index) => {
      return {
         id: key,
         index: index,
         name: data[key].name,
         email: data[key].email,
         role: data[key].role,
         createAt: data[key].createAt,
      };
   });

   return (
      <Box
         sx={{
            width: '90%',
            margin: '0 auto',
            height: 640,
         }}
      >
         <HeaderTable label={'MANAGEMENT USERS'}/>
         <DataGrid
            rows={rows}
            columns={columns}
         />
      </Box>
   );
}
const columns: GridColDef[] = [
   {field: 'email', headerName: 'Email', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl '},
   {field: 'name', headerName: 'Name', flex: 0.2, headerClassName: ' text-D1 font-extrabold text-xl'},
   {
      field: 'role', headerName: 'Role', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl',
   },
   {field: 'createAt', headerName: 'Create At', flex: 0.2, headerClassName: ' text-D1 font-extrabold text-xl'},
];

export default UserManagement
