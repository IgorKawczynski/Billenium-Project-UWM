import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import ModalRemoveCard from "@/componenets/card/modalRemoveCard/modalRemoveCard";
import {ModalEditCardMenuProps} from "@/componenets/card/interfaces/modalEditCardMenu/ModalEditCardMenu";
import ColorPicker from "@/componenets/card/cardColorPicker/ColorPicker";
import ModalEditCardUserList from "@/componenets/card/modalEditCardUserList/modalEditCardUserList";

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