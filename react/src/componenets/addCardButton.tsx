import React, {useState} from 'react';

import Button from '@mui/material/Button';

import AddCardButtonProps from "../interfaces/AddCardButton";
import ModalAddCard from "./modalAddCard";
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

export default function AddColumnButton(props:AddCardButtonProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onClick={handleOpen}
                    sx={{width:"100%", maxHeight:"50px"}}
                    variant="outlined"
                >
                    +
                </Button>
            </div>
            <ModalAddCard open={open} handleOpen={handleOpen} handleClose={handleClose} data={props.data} handleDataChange={props.handleDataChange}/>

        </div>
    );
}