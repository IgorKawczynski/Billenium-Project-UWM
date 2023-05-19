import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import ModalAddColumnProps from "@/components/column/interfaces/modalAddColumnInterface/ModalAddColumn";
import {modalStyle} from '@/assets/themes/modalStyle'
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {addColumn} from "@/services/utils/columnUtils/columnUtils";
import {useTranslation} from "react-i18next";

export default function ModalAddColumn(props:ModalAddColumnProps) {
    const [columnName, setColumnName] = useState("");
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };
    const { t } = useTranslation();


    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={() => closeModal(props.setOpen)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.open}>
                    <Stack sx={modalStyle} spacing={2}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            {t('addNewColumn')}
                        </Typography>
                        <TextField
                                id="outlined-basic"
                                label={t('name')}
                                variant="outlined"
                                value={columnName}
                                onChange={handleNameChange}
                        />
                        <Box style={{width:'100%'}}>
                        <Button
                            style={{marginTop:'8px', width:'100%'}}
                            onClick={() => addColumn(columnName,
                                                    props.data,
                                                    props.setData,
                                                    setColumnName ,
                                                    props.setOpen,
                                                    )}
                            variant="contained"
                        >
                            {t('add')}
                        </Button>
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
        </Box>
    );
}