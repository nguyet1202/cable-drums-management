import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

type RoleChipProps = {
   role: string;
   size?: "small" | "medium";
};

const RoleChip = (props: RoleChipProps) => {
   const [state, setState] = useState<{ color: any; label: string }>();

   useEffect(() => {
      switch (props.role) {
         case "admin":
            setState({ color: "secondary", label: "admin" });
            break;
         case "planner":
            setState({ color: "warning", label: "planner" });
            break;
         case "project_contractors":
            setState({ color: "success", label: "contractor" });
            break;
         case "supply_vendors":
            setState({ color: "info", label: "supplier" });
            break;
      }
   }, [props.role]);

   return (
      <Chip
         size={props.size ?? "medium"}
         variant="filled"
         color={state?.color}
         label={<p className="text-white">{state?.label}</p>}
      />
   );
};

export default RoleChip;