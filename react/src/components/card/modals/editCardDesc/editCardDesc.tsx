import React, {useState} from "react";
import {Box, IconButton, TextField, Tooltip, Typography, useTheme} from "@mui/material";
import {EditCardTitleProps} from "@/components/card/interfaces/editCardForm/editCardForm";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {updateCard} from "@/services/utils/cardUtils/cardUtils";
import {useTranslation} from "react-i18next";

const EditCardDesc = (props:EditCardTitleProps) => {
    const theme = useTheme()
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false)

    return(
        <>
            {isEditing && (
                <Box display={"flex"} alignItems={"center"}>
                    <TextField
                        sx={{margin:'0 0 8px 0', width:'80%'}}
                        id="outlined-basic"
                        label={t('description')}
                        variant="outlined"
                        multiline={true}
                        maxRows={5}
                        value={props.desc}
                        onChange={props.handleChangeText}
                    />
                    <IconButton
                        sx={{
                            maxWidth:'35px',
                            maxHeight:'35px',
                            color:theme.palette.primary.main
                        }}
                        size={"small"}
                        onClick={() => updateCard(props.cardId,props.text, props.desc,props.setData,props.data,props.setModalEdit)}
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
                <Box>
                    <Typography
                        textAlign={"left"}
                        variant={"subtitle1"}
                        color={theme.palette.text.primary}
                    >
                        {t('description')}
                    </Typography>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            textAlign={"left"}
                            variant={"caption"}
                            color={theme.palette.text.primary}
                        >
                            {props.desc}
                        </Typography>
                        <Tooltip title={t('editDescription')}>
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
                </Box>
            )}
        </>
    )
}
export default EditCardDesc