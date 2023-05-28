import React, {useState} from "react";

import {Box, IconButton, TextField, Tooltip, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import RedoIcon from '@mui/icons-material/Redo';
import {addSubtask} from "@/services/utils/cardUtils/subtaskUtils";
import {
    ModalEditCardSubtasksAddButtonProps
} from "@/components/card/interfaces/ModalEditCardSubtasksAddButton/ModalEditCardSubtasksAddButton";
import {useTranslation} from "react-i18next";

const ModalEditCardSubtasksAddButton = (props:ModalEditCardSubtasksAddButtonProps) =>{
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const { t } = useTranslation();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    return(
        <>
            { !open &&
                (
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant={"body2"} color={theme.palette.text.primary}>
                            {t('addNewSubtask')}
                        </Typography>
                        <IconButton
                            size={"small"}
                            onClick={() => openModal(setOpen)}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Box>
                )
            }
            {open &&(
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                        <TextField
                            variant={"standard"}
                            inputMode={"text"}
                            value={title}
                            onChange={handleTitleChange}
                            label={t('addNewSubtask')}
                        />
                    <Box>
                        <Tooltip
                            title={t('addSubtask')}
                            placement={'top'}
                        >
                            <IconButton
                                size={"small"}
                                sx={{color:theme.palette.primary.main}}
                                onClick={() => addSubtask(
                                    props.cardId,
                                    title,
                                    props.data,
                                    props.setData,
                                    setTitle,
                                    setOpen
                                )}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('undo')} placement={'top'}>
                            <IconButton
                                size={"small"}
                                onClick={() => closeModal(setOpen)}
                            >
                                <RedoIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                )
            }

        </>

    )
}

export default ModalEditCardSubtasksAddButton
