import * as React from 'react';
import {useState} from "react";
import Box from '@mui/material/Box';
import useGetData from "../../../hooks/useGetData";
import AddNewUser from "./AddNewUser";
import {Loading} from "../../base_components";
import {CustomToolbar} from "../../base_components";
import UserAction from "./UserAction";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {HeaderTable} from "../../components/data_display";
import {RoleChip} from "../../components/data_display";

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
         <AddNewUser/>
         <DataGrid
            rows={rows}
            columns={columns}
            slots={{
               toolbar: CustomToolbar,
            }}
         />
      </Box>
   );
}
const columns: GridColDef[] = [
   {field: 'email', headerName: 'Email', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl '},
   {field: 'name', headerName: 'Name', flex: 0.2, headerClassName: ' text-D1 font-extrabold text-xl'},
   {
      field: 'role', headerName: 'Role', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl',
      renderCell: (params: GridRenderCellParams) => <RoleChip role={params.value}/>
   },
   {field: 'createAt', headerName: 'Create At', flex: 0.2, headerClassName: ' text-D1 font-extrabold text-xl'},
   {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.1,
      headerClassName: 'text-D1 font-extrabold text-xl',
      renderCell: (params: GridRenderCellParams) => (
         <UserAction index={params.row.index} uid={params.row.id} />
      ),
   },
];

export default UserManagement
