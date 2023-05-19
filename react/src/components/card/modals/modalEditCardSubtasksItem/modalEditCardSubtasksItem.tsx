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
import {checkSubtask, uncheckSubtask, updateSubtask} from "@/services/utils/cardUtils/subtaskUtils";
import ModalRemoveSubtaskFromCard from "@/components/card/modals/modalRemoveSubtaskFromCard/modalRemoveSubtaskFromCard";
import {useTranslation} from "react-i18next";

const ModalEditCardSubtasksItem = (props:ModalEditCardSubtasksItemProps) =>{
    const theme = useTheme()
    const [isChecked, setIsChecked] = useState(props.isChecked)
    const [modalDelete, setModalDelete] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [open, setOpen] = useState(false)
    const { t } = useTranslation();


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
                                minWidth:'80%',
                                textDecorationLine: isChecked ? 'line-through' : 'none'
                            }}
                            control={
                                <Checkbox
                                    checked={isChecked}
                                    onClick={handleClickCheckbox}
                                />
                            }
                            label={props.title}
                        />
                        <Tooltip title={t('editSubtask')}>
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
                        </Tooltip>
                        <Tooltip title={t('deleteSubtask')}>
                            <IconButton
                                sx={{
                                    maxWidth:'35px',
                                    maxHeight:'35px'
                                }}
                                size={"small"}
                                onClick={() => openModal(setModalDelete)}
                            >
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
            {open && (
                <Box
                    maxHeight={'40px'}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <TextField
                        variant={"standard"}
                        inputMode={"email"}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <Box display={"flex"}>
                        <Tooltip
                            title={t('saveSubtask')}
                            placement={'top'}
                        >
                            <IconButton
                                sx={{color:theme.palette.primary.main}}
                                size={"small"}
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
                        <Tooltip title={t('undo')} placement={"top"}>
                            <IconButton
                                size={"small"}
                                onClick={() => closeModal(setOpen)}
                            >
                                <RedoIcon sx={{
                                    maxWidth:'30px',
                                    maxHeight:'30px'
                                }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            )
            }
            <ModalRemoveSubtaskFromCard
                id={props.id}
                title={props.title}
                cardTitle={props.cardTitle}
                data={props.data}
                setData={props.setData}
                modalDelete={modalDelete}
                setModalDelete={setModalDelete}
            />
        </>
    )
}
export default ModalEditCardSubtasksItem