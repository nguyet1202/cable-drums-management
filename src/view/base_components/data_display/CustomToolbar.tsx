import {
   GridToolbarContainer,
   GridToolbarColumnsButton,
   GridToolbarFilterButton,
   GridToolbarExport,
   GridToolbarQuickFilter
} from '@mui/x-data-grid'

import {Box} from "@mui/material"
import {ReactNode} from "react"

type TableToolBarProps = {
   leftTool?: ReactNode
}

function CustomToolbar(props: TableToolBarProps) {
   return (
      <GridToolbarContainer {...cfn.gridToolBarStyles}>
         <Box {...cfn.gridToolBarBox}>
            {props.leftTool}
            <GridToolbarFilterButton/>
            <GridToolbarColumnsButton size="small"/>
            <GridToolbarExport size="small"/>
         </Box>
         <GridToolbarQuickFilter {...cfn.gridToolbarQuickFilter} size="small"/>
      </GridToolbarContainer>
   )
}

const cfn = {
   gridToolBarStyles: {
      sx: {
         display: "flex",
         alignItems: 'center',
         justifyContent: "space-between",
         borderBottom: 1,
         borderColor: 'divider',
         paddingBottom: 1,
         paddingTop: 1,
      },
   },
   gridToolBarBox: {
      sx: {
         display: 'flex',
         gap: '20px',
      }
   },
   gridToolbarQuickFilter: {
      sx: {
         width: 400,
         padding: 0,
      },
      variant: "outlined" as const,
   }
}
export default CustomToolbar
