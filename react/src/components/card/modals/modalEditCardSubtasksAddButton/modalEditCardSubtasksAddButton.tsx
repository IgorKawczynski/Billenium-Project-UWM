import React, {useState} from "react";

import {Box, IconButton, TextField, Tooltip, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import RedoIcon from '@mui/icons-material/Redo';
import {addSubtask} from "@/services/utils/cardUtils/subtaskUtils";
import {
    ModalEditCardSubtasksAddButtonProps
} from "@/components/card/interfaces/ModalEditCardSubtasksAddButton/ModalEditCardSubtasksAddButton";

const ModalEditCardSubtasksAddButton = (props:ModalEditCardSubtasksAddButtonProps) =>{
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

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
                            Add new subtask
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
                            inputMode={"email"}
                            value={title}
                            onChange={handleTitleChange}
                            label={"Add new subtask"}
                        />
                    <Box>
                        <Tooltip
                            title={"Add subtask"}
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
                        <Tooltip title={'Redo'} placement={'top'}>
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
