import {ReactNode} from "react"
import {Box} from "@mui/material"

interface TabPanelProps {
   children?: ReactNode
   index: number
   value: number
}

function TabPanel(props: TabPanelProps) {
   const {children, value, index, ...other} = props

   return (
      <Box
         {...styles.wrapper}
         hidden={value !== index}
         aria-labelledby={`tab-${index}`}
         {...other}
      >
         {value === index && children}
      </Box>
   )
}

const styles = {
   wrapper: {
      height: "100%"
   }
}

export default TabPanel