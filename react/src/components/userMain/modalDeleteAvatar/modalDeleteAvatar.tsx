import React from "react";
import Modal from "@mui/material/Modal";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {removeColumn} from "@/services/utils/columnUtils/columnUtils";
import {ModalDeleteAvatarProps} from "@/components/userMain/interfaces/modalDeleteAvatar/modalDeleteAvatar";
import {deleteAvatar} from "@/services/utils/UserUtils/userMainUtils";

const ModalDeleteAvatar = (props:ModalDeleteAvatarProps) =>
{

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDeleteAvatar}
            onClose={() => closeModal(props.setModalDeleteAvatar)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalDeleteAvatar}>
                <Stack sx={modalStyle} spacing={3}>
                    <Grid style={{display:"flex",
                        textAlign:'center',
                        justifyContent:"center"
                    }}
                    >
                        <Typography color={'textPrimary'} variant={'body1'}>
                            Are you sure you want to delete your avatar?
                        </Typography>
                    </Grid>
                    <Grid style={{ display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => closeModal(props.setModalDeleteAvatar)}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            variant="contained"
                            onClick={() => deleteAvatar(props.userId,
                                                        props.setActiveUser,
                                                        props.setModalDeleteAvatar
                                                         )}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )

}
export default ModalDeleteAvatar
