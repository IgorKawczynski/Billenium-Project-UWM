import React from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalRemoveCardProps from "./interface/ModalRemoveCard";

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

export default function ModalRemoveCard(props:ModalRemoveCardProps) {
    const removeCard = () => {
        const column = props.data.columnList[props.columnId];
        const updatedItems = column.cards.filter((card:any) => card.id != props.id);
        const updatedColumn = { ...column, cards: updatedItems };
        props.handleDataChange({
            ...props.data,
            columnList: {
                ...props.data.columnList,
                [props.columnId]: updatedColumn
            },
        })
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDelete}
            onClose={props.modalDeleteClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalDelete}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
                        Are you sure you want to delete card: {props.title}?
                    </Typography>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginTop:"8px"}}>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => props.modalDeleteClose()}
                            variant="contained"
                        >
                            Close
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => removeCard()}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}