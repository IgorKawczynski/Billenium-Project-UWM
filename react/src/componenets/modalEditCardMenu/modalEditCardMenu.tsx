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
import ModalRemoveCard from "@/componenets/modalRemoveCard/modalRemoveCard";
import {ModalEditCardMenuProps} from "@/interfaces/modalEditCardMenu/ModalEditCardMenu";

export default function IconMenu(props:ModalEditCardMenuProps) {
    return (
        <Paper sx={{ width: 200, maxWidth: '100%'}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ColorLensIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Color</ListItemText>
                </MenuItem>
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