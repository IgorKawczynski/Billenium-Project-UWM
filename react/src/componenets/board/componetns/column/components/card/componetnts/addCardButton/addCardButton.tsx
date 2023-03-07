import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddCardButtonProps from "./interface/AddCardButton";
import ModalAddCard from "./components/modalAddCard/modalAddCard";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
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
        <Grid>
            <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onClick={handleOpen}
                    sx={{width:"100%", maxHeight:"50px", border:'1px solid'}}
                    variant="outlined"
                >
                    <Typography variant={'h6'}>+ </Typography> <Typography variant={"button"}> Add CARD </Typography>
                </Button>
            </Grid>
            <ModalAddCard open={open} handleOpen={handleOpen} handleClose={handleClose} columnId={props.columnId} data={props.data} handleDataChange={props.handleDataChange}/>

        </Grid>
    );
}