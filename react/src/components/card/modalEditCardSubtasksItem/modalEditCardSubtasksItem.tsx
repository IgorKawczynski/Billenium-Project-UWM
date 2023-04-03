import React, {useState} from "react";
import {Checkbox, FormControlLabel, useTheme, Box, IconButton, Typography, TextField, Tooltip} from "@mui/material";
import {
    ModalEditCardSubtasksItemProps
} from "@/components/card/interfaces/modalEditCardSubtasksItem/modalEditCardSubtasksItem";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RedoIcon from "@mui/icons-material/Redo";
import {checkSubtask} from "@/services/utils/cardUtils/subtaskUtils";

const ModalEditCardSubtasksItem = (props:ModalEditCardSubtasksItemProps) =>{
    const theme = useTheme()
    const [isChecked, setIsChecked] = useState(props.isChecked)
    const [title, setTitle] = useState(props.title)
    const [open, setOpen] = useState(false)


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handleClickCheckbox = () => {
        if(!isChecked){
            checkSubtask(
                props.id,
                props.data,
                props.setData
            )
        }
        setIsChecked(prevState => !prevState)
    }

    return(
        <>
            { !open &&
                (
                    <Box
                        display={"flex"}
                        justifyContent={"end"}
                    >
                        <FormControlLabel
                            sx={{
                                color:theme.palette.text.secondary,
                                margin:0,
                                minWidth:'80%'
                            }}
                            control={
                                <Checkbox
                                    checked={isChecked}
                                    onClick={handleClickCheckbox}
                                />
                            }
                            label={props.title}
                        />
                        <IconButton
                            sx={{
                                maxWidth:'35px',
                                maxHeight:'35px'
                            }}
                            size={"small"}
                            onClick={() => openModal(setOpen)}
                        >
                            <BorderColorOutlinedIcon/>
                        </IconButton>
                        <IconButton
                            sx={{
                                maxWidth:'35px',
                                maxHeight:'35px'
                            }}
                            size={"small"}
                        >
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                )
            }
            {open && (
                <Box>
                    <TextField
                        variant={"standard"}
                        inputMode={"email"}
                        value={title}
                        onChange={handleTitleChange}
                        InputProps={{
                            startAdornment:(
                                <Tooltip
                                    title={"Save subtask"}
                                    placement={'top'}
                                >
                                    <IconButton
                                    >
                                        <SaveOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }}
                    />
                    <IconButton
                        onClick={() => closeModal(setOpen)}
                    >
                        <RedoIcon sx={{color:theme.palette.primary.main}} />
                    </IconButton>
                </Box>
            )
            }

        </>
    )
}
export default ModalEditCardSubtasksItem