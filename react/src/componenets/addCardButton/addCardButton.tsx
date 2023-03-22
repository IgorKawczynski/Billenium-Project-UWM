import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddCardButtonProps from "@/interfaces/addCardButtonInterface/AddCardButton";
import ModalAddCard from "@/componenets/modalAddCard/modalAddCard";
import Typography from "@mui/material/Typography";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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
                    width:'100%',
                    flexDirection:"row",
                    justifyContent:"flex-end",
                    alignItems:"center"
                }}
            >
                <Button
                    onClick={() => openModal(setOpen)}
                    sx={{
                        maxHeight:"50px",
                    }}
                    variant="text"
                >
                    <Typography variant={"button"}> Add CARD </Typography>
                    <AddCircleOutlineOutlinedIcon/>
                </Button>
            </Box>
            <ModalAddCard
                open={open}
                setOpen={setOpen}
                cellId={props.cellId}
                data={props.data}
                setData={props.setData}
            />

        </Box>
    );
}