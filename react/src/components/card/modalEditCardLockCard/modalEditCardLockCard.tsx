import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import LockIcon from "@mui/icons-material/Lock";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {ModalEditCardLockCardProps} from "@/components/card/interfaces/modalEditCardLockCard/modalEditCardLockCard";


const ModalEditCardLockCard = (props:ModalEditCardLockCardProps) =>{


    return(
        <MenuItem>
            {!props.isLocked && (
                <>
                <ListItemIcon>
                    <LockIcon
                        fontSize="small"
                    />
                </ListItemIcon>
                <ListItemText>Lock card</ListItemText>
                </>
            )}
            {props.isLocked && (
                <>
                    <ListItemIcon>
                        <LockOpenIcon
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <ListItemText>Unlock card</ListItemText>
                </>
            )}
        </MenuItem>
    )
}
export default ModalEditCardLockCard