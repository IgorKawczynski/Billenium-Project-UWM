import React, {useState} from "react";
import {Box, IconButton, Typography, Button, useTheme} from "@mui/material";
import CardColor from "@/assets/themes/colors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import CloseIcon from '@mui/icons-material/Close';
import ColorLegendItem from "@/componenets/colorLegendItem/colorLegendItem";
import {ColorProps} from "@/interfaces/colorInterface/Color";

const ColorLegend = (props:ColorProps) => {
    const [show, setShow] = useState(false)
    const theme = useTheme()
    return(
        <>
        {!show &&
        (
            <Box
                marginTop={1}
                minHeight={'40px'}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Button onClick={() => openModal(setShow)}>
                    <ColorLensIcon fontSize="small" />
                    <Typography variant={"button"}>
                        Show color legend
                    </Typography>
                </Button>
            </Box>
        )
        }
        {show &&
            (<Box
            marginTop={1}
            minHeight={'40px'}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            >
                <IconButton onClick={() => closeModal(setShow)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <ColorLegendItem color={theme.palette.text.secondary} title={"Default"}/>
                <ColorLegendItem color={CardColor.purple} title={"Color 1"}/>
                <ColorLegendItem color={CardColor.blue} title={"Color 2"}/>
                <ColorLegendItem color={CardColor.green} title={"Color 3"}/>
                <ColorLegendItem color={CardColor.yellow} title={"Color 4"}/>
                <ColorLegendItem color={CardColor.red} title={"Color 5"}/>
        </Box>)
        }
        </>
    )
}
export default ColorLegend