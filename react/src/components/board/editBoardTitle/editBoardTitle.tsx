import React, {useState} from "react";
import {Box, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import RedoIcon from "@mui/icons-material/Redo";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {EditBoardFormProps} from "@/components/board/interfaces/editBoardFroms/editBoardTitle";
import {editBoardTitle} from "@/services/utils/boardUtils/boardUtils";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from "react-i18next";


const EditBoardTitle = (props:EditBoardFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const theme = useTheme()
    const { t } = useTranslation();
    const handleRedo = () =>{
        closeModal(setIsEditing)
        props.setText(props.data.title)
    }

    // @ts-ignore
    // @ts-ignore
    return(
        <>
            {isEditing && (
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <TextField
                        sx={{margin:'0 0 8px 0'}}
                        label={t('title')}
                        variant="standard"
                        value={props.text}
                        onChange={props.handleTextChange}
                    />
                    <Box display={"flex"}>
                        <Tooltip
                            title={t('saveBoardTitle')}
                            placement={'top'}
                        >
                            <IconButton
                                sx={{color:theme.palette.primary.main}}
                                size={"small"}
                                onClick={() => editBoardTitle(props.data.id,
                                                                props.text,
                                                                props.data,
                                                                props.setData,
                                                                setIsEditing
                                                            )}
                            >
                                <SaveOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('undo')} placement={"top"}>
                            <IconButton
                                size={"small"}
                                onClick={() => handleRedo()}
                            >
                                <RedoIcon sx={{
                                    maxWidth:'30px',
                                    maxHeight:'30px'
                                }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>
            )}
            {!isEditing && (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box
                        minWidth={'35px'}
                        minHeight={'35px'}
                    >

                    </Box>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                        <Typography
                            color={'textPrimary'}
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {props.text}
                        </Typography>
                        <Tooltip title={t('editBoardTitle')}>
                            <IconButton
                                sx={{
                                    maxWidth:'35px',
                                    maxHeight:'35px'
                                }}
                                size={"small"}
                                onClick={() => openModal(setIsEditing)}
                            >
                                <BorderColorOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <IconButton
                        size={"small"}
                    sx={{
                        height:'35px',
                        width:'35px'
                    }}
                        //@ts-ignore
                    onClick={() => closeModal(props.setModalEdit)}
                    >
                        <CloseIcon/>
                    </IconButton>

                </Box>
            )}
        </>
    )
}
export default EditBoardTitle