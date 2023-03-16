import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddCardButtonProps from "@/interfaces/addCardButtonInterface/AddCardButton";
import ModalAddCard from "@/componenets/modalAddCard/modalAddCard";
import Typography from "@mui/material/Typography";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
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

export default function AddCardButton(props:AddCardButtonProps) {
    const [open, setOpen] = useState(false);
    return (
        <Box>
            <Box
                style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <Button
                    onClick={() => openModal(setOpen)}
                    sx={{
                        width:"100%",
                        maxHeight:"50px",
                        border:'1px solid'
                    }}
                    variant="outlined"
                >
                    <Typography variant={'h6'}> + </Typography>
                    <Typography variant={"button"}> Add CARD </Typography>
                </Button>
            </Box>
            <ModalAddCard
                open={open}
                setOpen={setOpen}
                columnId={props.columnId}
                data={props.data}
                setData={props.setData}
            />

        </Box>
    );
}