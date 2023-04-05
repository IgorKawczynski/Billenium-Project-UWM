import React, {useState} from "react";
import {Box, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import RedoIcon from "@mui/icons-material/Redo";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {EditBoardFormProps} from "@/components/board/interfaces/editBoardFroms/editBoardTitle";
import {editWipLimit} from "@/services/utils/boardUtils/boardUtils";


const EditBoardWipLimit = (props:EditBoardFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const theme = useTheme()
    const handleRedo = () =>{
        closeModal(setIsEditing)
        props.setText(props.data.wipLimit)
    }

    return(
        <>
            {isEditing && (
                <Box
                    display={"flex"}
                >
                    <TextField
                        sx={{margin:'0 0 8px 0'}}
                        label="New wip limit"
                        variant="standard"
                        type={"number"}
                        value={props.text}
                        onChange={props.handleTextChange}
                    />
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                    >
                        <Tooltip
                            title={"Save board wip limit"}
                            placement={'top'}
                        >
                            <IconButton
                                sx={{
                                    maxWidth:'30px',
                                    maxHeight:'30px',
                                    color:theme.palette.primary.main
                                }}
                                size={"small"}
                                onClick={() => editWipLimit(
                                    props.data.id,
                                    props.text,
                                    props.data,
                                    props.setData,
                                    setIsEditing,
                                )}
                            >
                                <SaveOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Redo'} placement={"top"}>
                            <IconButton
                                size={"small"}
                                sx={{
                                    maxWidth:'30px',
                                    maxHeight:'30px'
                                }}
                                onClick={() => handleRedo()}
                            >
                                <RedoIcon
                                    sx={{
                                    maxWidth:'30px',
                                    maxHeight:'30px'
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>
            )}
            {!isEditing && (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"left"}
                    minHeight={'40px'}
                >
                    <Typography
                        color={'textPrimary'}
                        id="transition-modal-title"
                        variant="subtitle1"
                    >
                        Wip limit:
                    </Typography>
                    <Typography
                        color={'textPrimary'}
                        id="transition-modal-title"
                        variant="h6"
                        sx={{marginLeft:1}}
                    >
                        {props.text}
                    </Typography>
                    <Tooltip title={'Edit subtask'}>
                        <IconButton
                            sx={{
                                maxWidth:'25px',
                                maxHeight:'25px',
                            }}
                            size={"small"}
                            onClick={() => openModal(setIsEditing)}
                        >
                            <BorderColorOutlinedIcon
                                sx={{
                                    maxWidth:'25px',
                                    maxHeight:'25px',
                                    fontSize:'18px'
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </>
    )
}
export default EditBoardWipLimit