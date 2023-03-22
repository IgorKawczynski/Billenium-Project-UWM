import React from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import ModalRemoveColumnProps from "@/components/column/interfaces/modalRemoveColumnInterface/ModalRemoveColumn";
import {modalStyle} from "@/assets/themes/modalStyle";
import Typography from "@mui/material/Typography";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {removeColumn} from "@/services/utils/columnUtils/columnUtils";

const ModalRemoveColumn = (props:ModalRemoveColumnProps) => {

    return(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalDelete}
                onClose={() => closeModal(props.setModalDelete)}
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
                        <Grid style={{display:"flex",
                            textAlign:'center',
                            justifyContent:"center"
                            }}
                        >
                        <Typography color={'textPrimary'} variant={'body1'}>
                                Are you sure you want to delete column: {props.title}?
                        </Typography>
                        </Grid>
                            <Grid style={{ display:"flex",
                                        justifyContent:"space-between",
                                        width:"100%"}}
                            >
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => closeModal(props.setModalDelete)}
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => removeColumn(props.id,
                                                                props.data,
                                                                props.setData
                                                                )}
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
