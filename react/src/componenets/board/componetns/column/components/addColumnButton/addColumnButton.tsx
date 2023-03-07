import React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddColumnButtonProps from "./interface/AddColumnButton";
import ModalAddColumn from "./components/modalAddColumn/modalAddColumn";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

export default function AddColumnButton(props:AddColumnButtonProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <Grid>
            <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onClick={handleOpen}
                    sx={{maxWidth:"200px", maxHeight:"50px"}}
                    variant="contained"
                >
                <Typography variant={'h6'}>+</Typography> <Typography variant={"button"}> Add column </Typography>
                </Button>
            </Grid>
            <ModalAddColumn open={open} handleOpen={handleOpen} handleClose={handleClose} data={props.data} handleDataChange={props.handleDataChange}/>
        </Grid>
    );
}