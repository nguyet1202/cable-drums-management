import {Chip} from "@mui/material";
import {useEffect, useState} from "react";

type RoleChipProps = {
    status: string;
    size?: "small" | "medium";
    isDisabled: boolean;
    onClick?: () => void
};

const StatusChip = (props: RoleChipProps) => {
    const [state, setState] = useState<{ color: any; label: string; isDisabled: boolean; }>();

    useEffect(() => {
        switch (props.status) {
            case "new":
                setState({color: "secondary", label: "New", isDisabled: props.isDisabled});
                break;
            case "ready to collect":
                setState({color: "success", label: "ready to collect", isDisabled: props.isDisabled});
                break;
            case "collected":
                setState({color: "info", label: "collected", isDisabled: props.isDisabled});
                break;
        }
    }, [props.status]);


    return (
        <Chip
            onClick={props.onClick}
            size={props.size ?? "medium"}
            variant="filled"
            color={state?.color}
            label={<p className="text-white">{state?.label}</p>}
            sx={{
                cursor: props.isDisabled ? "not-allowed" : "pointer",
                opacity: props.isDisabled ? 0.6 : 1,
            }}
        />
    );
};

export default StatusChip;