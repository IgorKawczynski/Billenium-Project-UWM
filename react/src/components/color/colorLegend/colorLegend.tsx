import React, {useState} from "react";
import {Box, IconButton, Typography, Button, useTheme} from "@mui/material";
import CardColor from "@/assets/themes/colors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import CloseIcon from '@mui/icons-material/Close';
import ColorLegendItem from "@/components/color/colorLegendItem/colorLegendItem";
import {ColorProps} from "@/components/color/interfaces/colorInterface/Color";
import {ColorListProps} from "@/components/color/interfaces/colorListInterface/colorList";
import CardColorPickerItem from "@/components/card/cardColorPickerItem/cardColorPickerItem";

const ColorLegend = (props:ColorListProps) => {
    const [show, setShow] = useState(false)
    const theme = useTheme()
    return(
        <Box>
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
                {props.colors.map((color) => (
                    <Box key={color.id}>
                        {color.value == "default" && (
                            <ColorLegendItem id={color.id} color={theme.palette.text.secondary} title={"Default"}/>
                        )}
                        {color.value != 'default' &&(
                            <ColorLegendItem id={color.id} color={color.value} title={color.title}/>
                        )}
                    </Box>
                ))}
        </Box>)
        }
        </Box>
    )
}
export default ColorLegend