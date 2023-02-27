import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditCardButtonProps from "../interfaces/EditCardButton";
import {v4 as uuidv4} from "uuid";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {useState, useEffect} from "react";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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
    const [name, setName] = useState(props.content);
    const [desc, setDesc] = useState(props.desc);
    const open = Boolean(anchorEl);
    const [modal, setModal] = React.useState(false);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setName(props.content);
    }, [props.content]);
    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setDesc(props.desc);
    }, [props.desc]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const modalOpen = () => setModal(true);
    const modalClose = () => setModal(false);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };
    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };

    const removeTask = () => {
        handleClose();
        const column = props.columns[props.columnId];
        const updatedItems = column.items.filter((item) => item.id != props.id);
        const updatedColumn = { ...column, items: updatedItems };
        props.setColumns({ ...props.columns, [props.columnId]: updatedColumn });
    }

    const updateCard = (name: string, desc: string) => {
        const newItemId = uuidv4();
        const newItem = { id: newItemId, content: name, desc: desc };
        const column = props.columns[props.columnId];
        const newItems = column.items.map(item => {
            if (item.id === props.id) {
                // jeśli to jest zadanie, które chcemy zaktualizować, to zwracamy nowe zadanie
                return {
                    ...item,
                    ...newItem
                };
            }
            // w przeciwnym przypadku zwracamy istniejące zadanie bez zmian
            return item;
        });

        // tworzymy nową kolumnę z zaktualizowanymi zadaniami
        const newColumn = {
            ...column,
            items: newItems
        };

        // zaktualizowana lista kolumn
        const newColumns = {
            ...props.columns,
            [props.columnId]: newColumn
        };

        props.setColumns(newColumns);
        modalClose();
    };

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
                <MenuItem onClick={modalOpen} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={removeTask} disableRipple>
                    <ArchiveIcon />
                    Delete
                </MenuItem>
            </StyledMenu>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={modalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Set column name
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    multiline
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    value={desc}
                                    maxRows={5}
                                    onChange={handleDescChange}
                                />
                            </Typography>
                        </div>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => updateCard(name,desc)}
                            variant="contained"
                        >
                            Dodaj
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}