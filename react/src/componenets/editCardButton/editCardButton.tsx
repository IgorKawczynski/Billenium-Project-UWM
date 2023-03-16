import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Box, useTheme} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditCardButtonProps from "@/interfaces/editCardButtonInterface/EditCardButton";
import ModalEditCard from "@/componenets/modalEditCard/modalEditCard";
import ModalRemoveCard from "@/componenets/modalRemoveCard/modalRemoveCard";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {StyledMenu} from "@/assets/styles/styledMenu";
import IconButton from "@mui/material/IconButton";

export default function EditCardButton(props:EditCardButtonProps) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box style={{display:"flex",justifyContent:"flex-end"}}>

            <IconButton
                sx={{fontSize:12, color:theme.palette.primary.main, maxWidth:'30px', maxHeight:'30px'}}
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => openModal(setModalEdit)} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => openModal(setModalDelete)} disableRipple>
                    <DeleteOutlinedIcon />
                    Delete
                </MenuItem>
            </StyledMenu>
            
            <ModalEditCard
                id={props.id}
                columnId={props.columnId}
                title={props.title}
                desc={props.desc}
                setModalEdit={setModalEdit}
                modalEdit={modalEdit}
                data={props.data}
                setData={props.setData}
            />
            <ModalRemoveCard
                id={props.id}
                title={props.title}
                columnId={props.columnId}
                setModalDelete={setModalDelete}
                modalDelete={modalDelete}
                data={props.data}
                setData={props.setData}
            />

        </Box>
    );
}