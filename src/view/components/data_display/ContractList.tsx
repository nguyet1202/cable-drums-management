import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Text, CustomToolbar} from "../../base_component";

const ContractList = () => {

   const data = useSelector((state: RootState) => state.contract.data);

   const rows = Object.keys(data).map((id) => {
      return {
         id: id,
         ...data[id],
      };
   })

   return (
      <Box {...cfn.wrapper}>
         <div
            className={`flex flex-row justify-between items-center w-full border-[1px] border-G2 pl-5 bg-G h-[72px] `}>
            <Text size={'2xl'} weight={'bold'} color={'white'}>{'ALL CONTRACTS'}</Text>
         </div>
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
   {
      field: 'start_date',
      headerName: 'Start Day',
      flex: 0.2,
      headerClassName: 'text-D1 font-extrabold text-xl',
      headerAlign: 'center',
      align: 'center'
   },
   {
      field: 'end_date',
      headerName: 'End Day',
      flex: 0.2,
      headerClassName: 'text-D1 font-extrabold text-xl',
      headerAlign: 'center',
      align: 'center'
   },
   {
      field: 'contract_amount',
      headerName: 'Quantity',
      flex: 0.2,
      headerClassName: 'text-D1 font-extrabold text-xl',
      headerAlign: 'center',
      align: 'center'
   },
   {
      field: 'supply_vendor_id',
      headerName: 'Supply Team ID',
      flex: 0.2,
      headerClassName: 'text-D1 font-extrabold text-xl',
      headerAlign: 'center',
      align: 'center'
   },
];

export default ContractList;

