import React, {useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import ModalRemoveColumnProps from "./interface/ModalRemoveColumn";
import {getColumnFromBackend, removeColumnToBackend} from "../../../../../../services/columnService";
import {_Data} from "../../../../../../interfaces/DataBoard";
import {modalStyle} from "../../../../../../assets/themes/modalStyle";
import Typography from "@mui/material/Typography";

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
                    <Stack sx={modalStyle} spacing={3}>
                        <Grid style={{display:"flex", textAlign:'center', justifyContent:"center"}}>
                        <Typography color={'textPrimary'} variant={'body1'}>
                                Are you sure you want to delete column: {props.title}?
                        </Typography>
                        </Grid>
                            <Grid style={{ display:"flex", justifyContent:"space-between", width:"100%"}}>
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
                            </Grid>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalRemoveColumn
