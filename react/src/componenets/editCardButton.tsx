import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditCardButtonProps from "../interfaces/EditCardButton";
import ModalEditCard from "./modalEditCard";
import ModalRemoveCard from "./modalRemoveCard";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 150,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 12,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function EditCardButton(props:EditCardButtonProps) {
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
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);
    const modalDeleteOpen = () => setModalDelete(true);
    const modalDeleteClose = () => setModalDelete(false);



    return (
        <div style={{display:"flex",justifyContent:"flex-end", marginTop:10}}>

            <Button
                sx={{width:100, fontSize:12}}
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Options
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={modalEditOpen} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={modalDeleteOpen} disableRipple>
                    <ArchiveIcon />
                    Delete
                </MenuItem>
            </StyledMenu>
            
            <ModalEditCard
                id={props.id}
                columnId={props.columnId}
                title={props.title}
                desc={props.desc}
                modalEditClose={modalEditClose}
                modalEdit={modalEdit}
                data={props.data}
                handleDataChange={props.handleDataChange}
            />
            <ModalRemoveCard
                id={props.id}
                title={props.title}
                columnId={props.columnId}
                modalDeleteClose={modalDeleteClose}
                modalDelete={modalDelete}
                data={props.data}
                handleDataChange={props.handleDataChange}
            />

        </div>
    );
}