import React, {useState} from "react";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {TextField, useTheme} from "@mui/material";
import {setColorProps} from "@/components/color/interfaces/colorInterface/Color";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import CloseIcon from "@mui/icons-material/Close";
import {updateColor} from "@/services/utils/colorUtils/colorUtils";

const ColorSetterRow = (props:setColorProps) =>{
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState("")
    const theme = useTheme()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

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
                    value={title}
                    onChange={handleTitleChange}
                />
                    <IconButton onClick={() => updateColor(props.id, title, props.setData, props.data, setEdit)}>
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