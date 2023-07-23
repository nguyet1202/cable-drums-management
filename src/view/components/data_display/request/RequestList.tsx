import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {CustomToolbar} from "../../../base_component";
import WithdrawRequestAction from "./WithdrawRequestAction";
import {CreateWithdrawRequest} from "../../../pages";
import {HeaderTable} from "../index";
const RequestList = () => {

   const data = useSelector((state: RootState) => state.request.data);

   const Request = data
      ? Object.keys(data)
         .map(key => data[key])
         .reverse()
      : [];

   const rows = Request.map((request, id) => ({
      id: id,
      ...request,
   }));

   return (
      <Box {...cfn.wrapper}>
         <HeaderTable label={'ALL REQUEST'}/>
         <CreateWithdrawRequest/>
         <DataGrid
            columns={columns} rows={rows ?? []}
            slots={{toolbar: CustomToolbar}}
         />
      </Box>
   );
};

const cfn = {
   wrapper: {
      sx: {
         width: '100%',
         height: 600,
      }
   },
}

const columns: GridColDef[] = [
   {field: 'id', headerName: 'Request ID', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'contract_id', headerName: 'Contract ID', flex: 0.15, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'amount', headerName: 'Quantity', flex: 0.15, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'supply_vendor_name', headerName: 'Supply Team', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'project_contractor_name', headerName: 'Contractor Team', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'planner_name', headerName: 'Planner Team', flex: 0.2, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'created_at', headerName: 'Created at', flex: 0.15, headerClassName: 'text-D1 font-extrabold text-xl'},
   {field: 'actions', headerName: 'Status', type: 'actions', flex: 0.15,headerClassName: 'text-D1 font-extrabold text-xl',
      renderCell: (params) => <WithdrawRequestAction {...{ params }} />,
   },
];

export default RequestList;

