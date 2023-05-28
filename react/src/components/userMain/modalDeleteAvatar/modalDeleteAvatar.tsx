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
import {ModalDeleteAvatarProps} from "@/components/userMain/interfaces/modalDeleteAvatar/modalDeleteAvatar";
import {deleteAvatar} from "@/services/utils/UserUtils/userMainUtils";
import {useTranslation} from "react-i18next";

const ModalDeleteAvatar = (props:ModalDeleteAvatarProps) =>
{
    const { t } = useTranslation();

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
                            {t('deleteAvatarMessage')}
                        </Typography>
                    </Grid>
                    <Grid style={{ display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => closeModal(props.setModalDeleteAvatar)}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            variant="contained"
                            onClick={() => deleteAvatar(props.activeUser.id,
                                                        props.setActiveUser,
                                                        props.setModalDeleteAvatar
                                                         )}
                        >
                            {t('delete')}
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )

}
export default ModalDeleteAvatar
