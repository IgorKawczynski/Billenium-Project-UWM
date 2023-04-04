import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {ModalEditCardMenuProps} from "@/components/card/interfaces/modalEditCardMenu/ModalEditCardMenu";
import ColorPicker from "@/components/card/cardColorPicker/ColorPicker";
import ModalEditCardUserList from "@/components/card/modals/modalEditCardUserList/modalEditCardUserList";
import ModalEditCardLockCard from "@/components/card/modals/modalEditCardLockCard/modalEditCardLockCard";

const CardMenu = (props:ModalEditCardMenuProps) => {
    return (
        <Paper sx={{ width: 200, maxWidth: '100%'}}>
            <MenuList>
                <ModalEditCardUserList
                    cardId={props.cardId}
                    cardTitle={props.cardTitle}
                    assignedUsers={props.assignedUsers}
                    data={props.data}
                    setData={props.setData}/>
                <ColorPicker
                    colors={props.data.colorList}
                    data={props.data}
                    setData={props.setData}
                    cardId={props.cardId}
                    cardTitle={props.cardTitle}/>
                <ModalEditCardLockCard
                    cardId={props.cardId}
                    title={props.cardTitle}
                    isLocked={props.isLocked}
                    data={props.data}
                    setData={props.setData}
                />
                <Divider />
                <MenuItem onClick={() => openModal(props.setModalDelete)}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default CardMenu