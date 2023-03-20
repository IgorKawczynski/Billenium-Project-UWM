import React, {useState} from "react";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {useTheme, TextField} from "@mui/material";
import {ColorProps} from "@/interfaces/colorInterface/Color";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import CloseIcon from "@mui/icons-material/Close";

const ColorSetterRow = (props:ColorProps) =>{
    const [edit, setEdit] = useState(false)
    const theme = useTheme()

    return(

        <Box display={"flex"} sx={{justifyContent:'end'}}>
            {!edit && (<>
            <Box display={"flex"} minWidth={'100px'} alignItems={"center"} marginRight={1}>
                <Box
                    width={'20px'}
                    height={'20px'}
                    borderRadius={'50%'}
                    bgcolor={props.color}
                    marginRight={1}
                />
                <Typography color={theme.palette.text.primary}>
                    {props.title}
                </Typography>
            </Box>
            <IconButton
                onClick={() => openModal(setEdit)}
                size={"small"}
                aria-label="settingsColumn"
            >
                <BorderColorOutlinedIcon/>
            </IconButton>
            </>)}
            {edit && (
                <Box display={"flex"} alignItems={"center"}>
                <Box
                    width={'20px'}
                    height={'20px'}
                    borderRadius={'50%'}
                    bgcolor={props.color}
                    marginRight={1}
                />
                <TextField
                    variant={"standard"}
                    id="outlined-multiline-flexible"
                    label={props.title}
                />
                    <IconButton onClick={() => closeModal(setEdit)}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => closeModal(setEdit)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}

export default ColorSetterRow