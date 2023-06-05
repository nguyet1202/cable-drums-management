import React from "react";
import { TableCell } from "@mui/material";
import {Text} from "../../../base_components";

type TableHeaderCellProps = {
   text: string;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ text }) => {
   return (
      <TableCell align="center">
         <Text weight="bold" color="white">{text}</Text>
      </TableCell>
   );
};

export default TableHeaderCell;
