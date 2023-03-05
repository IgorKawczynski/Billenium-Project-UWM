import React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddColumnButtonProps from "./interface/AddColumnButton";
import ModalAddColumn from "./components/modalAddColumn/modalAddColumn";

export default function AddColumnButton(props:AddColumnButtonProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <Box>
            <Box style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                Add Column
                <Button
                    onClick={handleOpen}
                    sx={{width:"200px", maxHeight:"50px"}}
                    variant="outlined"
                >
                +
                </Button>
            </Box>
            <ModalAddColumn open={open} handleOpen={handleOpen} handleClose={handleClose} data={props.data} handleDataChange={props.handleDataChange}/>
        </Box>
    );
}