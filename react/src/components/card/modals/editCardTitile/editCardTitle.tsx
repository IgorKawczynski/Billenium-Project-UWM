import React, {useState} from "react";
import {IconButton, TextField, Tooltip, Typography, useTheme, Box} from "@mui/material";
import {EditCardFormProps} from "@/components/card/interfaces/editCardForm/editCardForm";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const EditCardTitle = (props:EditCardFormProps) => {
    const theme = useTheme()
    const [isEditing, setIsEditing] = useState(false)

    return(
        <>
            {isEditing && (
                <Box display={"flex"} alignItems={"center"}>
                    <TextField
                        sx={{margin:'0 0 8px 0', width:'80%'}}
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={props.text}
                        onChange={props.handleChangeText}
                    />
                    <IconButton
                        sx={{
                            maxWidth:'35px',
                            maxHeight:'35px',
                            color:theme.palette.primary.main
                        }}
                        size={"small"}
                        onClick={() => closeModal(setIsEditing)}
                    >
                        <CheckIcon/>
                    </IconButton>
                    <IconButton
                        sx={{
                            maxWidth:'35px',
                            maxHeight:'35px'
                        }}
                        size={"small"}
                        onClick={() => closeModal(setIsEditing)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            )}
            {!isEditing && (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        variant={"body1"}
                        color={theme.palette.text.primary}
                    >
                        {props.text}
                    </Typography>
                    <Tooltip title={'Edit Title'}>
                        <IconButton
                            sx={{
                                maxWidth:'30px',
                                maxHeight:'30px'
                            }}
                            size={"small"}
                            onClick={() => openModal(setIsEditing)}
                        >
                            <BorderColorOutlinedIcon
                                sx={{
                                    maxWidth:'20px',
                                    maxHeight:'20px'
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </>
    )
}
export default EditCardTitle