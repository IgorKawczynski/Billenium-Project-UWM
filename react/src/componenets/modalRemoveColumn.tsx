import React, {useState} from 'react'
import ColumnProps from '../interfaces/Column'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ModalRemoveColumnProps from "../interfaces/ModalRemoveColumn";

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

const ModalRemoveColumn = (props:ModalRemoveColumnProps) => {
    const removeColumn = (id:string) => {
        // utwórz nową tablicę bez usuwanej kolumny
        const newColumns = { ...props.data.columnList };
        delete newColumns[id];
        const lastColumnId = Object.keys(newColumns)[Object.keys(newColumns).length - 1];
        Object.values(newColumns).forEach((column:any, index) => {
            if (column.position > index) {
                column.position = index;
            }
        });
        // przypisz nową tablicę do state'u
        props.handleDataChange({
            ...props.data,
            columnList: {
                ...newColumns,
                [lastColumnId]: { ...newColumns[lastColumnId], position: Object.keys(newColumns).length - 1 },
            },
        })

    };

    return(
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
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <div style={{textAlign:"center", fontSize:"24px"}}>
                                Are you sure you want to delete column {props.title}?
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between", width:"100%"}}>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => props.modalDeleteClose()}
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => removeColumn(props.id)}
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
    )
}

export default ModalRemoveColumn
