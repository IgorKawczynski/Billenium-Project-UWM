import React, {useState} from "react";
import {Box, Checkbox, FormControlLabel, IconButton, TextField, Tooltip, useTheme} from "@mui/material";
import {
    ModalEditCardSubtasksItemProps
} from "@/components/card/interfaces/modalEditCardSubtasksItem/modalEditCardSubtasksItem";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RedoIcon from "@mui/icons-material/Redo";
import {checkSubtask, removeSubtask, uncheckSubtask, updateSubtask} from "@/services/utils/cardUtils/subtaskUtils";

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
                title,
                props.data,
                props.setData,
                props.window
            )
        }
        if(isChecked){
            uncheckSubtask(
                props.id,
                title,
                props.data,
                props.setData,
                props.window
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
                        maxHeight={'40px'}
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
                            onClick={() => removeSubtask(
                                                        props.id,
                                                        title,
                                                        props.data,
                                                        props.setData
                                                    )}
                        >
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                )
            }
            {open && (
                <Box
                    maxHeight={'40px'}
                >
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
                                        sx={{color:theme.palette.primary.main}}
                                        onClick={() => updateSubtask(
                                                            props.id,
                                                            title,
                                                            props.data,
                                                            props.setData
                                                            )}
                                    >
                                        <SaveOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }}
                    />
                    <Tooltip title={'Redo'} placement={"top"}>
                    <IconButton
                        onClick={() => closeModal(setOpen)}
                    >
                        <RedoIcon />
                    </IconButton>
                </Tooltip>
                </Box>
            )
            }

        </>
    )
}
export default ModalEditCardSubtasksItem