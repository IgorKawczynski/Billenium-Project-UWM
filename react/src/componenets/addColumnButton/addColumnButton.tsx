import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddColumnButtonProps from "@/interfaces/addColumnButtonInterface/AddColumnButton";
import ModalAddColumn from "@/componenets/modalAddColumn/modalAddColumn";
import Typography from "@mui/material/Typography";
import {openModal} from "@/services/utils/modalUtils/modalUtils";

export default function AddColumnButton(props:AddColumnButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <Box style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
                }}
            >
                <Button
                    onClick={() => openModal(setOpen)}
                    sx={{
                        maxWidth:"200px",
                        maxHeight:"50px"
                    }}
                    variant="contained"
                >
                <Typography variant={'h6'}>+</Typography>
                <Typography variant={"button"}> Add column </Typography>

                </Button>
            </Box>
            <ModalAddColumn
                open={open}
                setOpen={setOpen}
                data={props.data}
                setData={props.setData}
            />
        </Box>
    );
}