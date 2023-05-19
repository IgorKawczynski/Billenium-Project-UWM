import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ModalAddCardProps from "@/components/card/interfaces/modalAddCard/ModalAddCard";
import {modalStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {addCard} from "@/services/utils/cardUtils/cardUtils";
import {useTranslation} from "react-i18next";

export default function ModalAddCard(props:ModalAddCardProps) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const { t } = useTranslation();
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };

    return (
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
                    <Box sx={modalStyle}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            {t('addCard')}
                        </Typography>
                        <Box style={{display:"flex",flexDirection:'column', justifyContent:"space-between"}}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label={t('name')}
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    multiline
                                    id="outlined-basic"
                                    label={t('description')}
                                    variant="outlined"
                                    value={desc}
                                    maxRows={5}
                                    onChange={handleDescChange}
                                />
                            <Button
                                onClick={() => addCard(name,
                                                        desc,
                                                        props.cellId,
                                                        props.data,
                                                        props.setData,
                                                        setName,
                                                        setDesc,
                                                        props.setOpen
                                                    )}
                                variant="contained"
                            >
                                {t('add')}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
    );
}