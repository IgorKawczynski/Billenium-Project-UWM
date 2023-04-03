import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import LockIcon from "@mui/icons-material/Lock";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {ModalEditCardLockCardProps} from "@/components/card/interfaces/modalEditCardLockCard/modalEditCardLockCard";
import {lockCard, unlockCard} from "@/services/utils/cardUtils/cardUtils";


const ModalEditCardLockCard = (props:ModalEditCardLockCardProps) =>{


    return(
        <>
            {!props.isLocked && (
                <MenuItem
                onClick={() => lockCard(
                    props.cardId,
                    props.title,
                    props.data,
                    props.setData
                )}
                >
                <ListItemIcon>
                    <LockIcon
                        fontSize="small"
                    />
                </ListItemIcon>
                <ListItemText>Lock card</ListItemText>
                </MenuItem>
            )}
            {props.isLocked && (
                <MenuItem
                    onClick={() => unlockCard(
                        props.cardId,
                        props.title,
                        props.data,
                        props.setData
                    )}
                >
                    <ListItemIcon>
                        <LockOpenIcon
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <ListItemText>Unlock card</ListItemText>
                </MenuItem>
            )}
        </>
    )
}
export default ModalEditCardLockCard