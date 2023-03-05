import React, {useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModalRemoveColumnProps from "./interface/ModalRemoveColumn";
import {getColumnFromBackend, removeColumnToBackend} from "../../../../../../services/columnService";
import {_Data} from "../../../../../../interfaces/DataBoard";
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
    fontFamily: 'Open Sans',
}

const ModalRemoveColumn = (props:ModalRemoveColumnProps) => {
    const removeColumn = (id:string) => {
        removeColumnToBackend(id)
            .then(res => {
                getColumnFromBackend(props.data.id)
                    .then( res => {
                        if(res) {
                            const columns:_Data["data"]['columnList'] = res
                            props.handleDataChange({
                                ...props.data,
                                columnList: columns

                            })
                        }})
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
                    <Stack sx={style} spacing={3}>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center",fontSize:"18px"}}>
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
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalRemoveColumn
