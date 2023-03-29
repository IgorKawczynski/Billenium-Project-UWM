import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {useTheme} from "@mui/material";
import CardColor from "@/assets/themes/colors";
import ColorSetterRow from "@/components/color/colorSetterRow/colorSetterRow";
import {ColorListProps} from "@/components/color/interfaces/colorListInterface/colorList";
import ColorLegendItem from "@/components/color/colorLegendItem/colorLegendItem";

const ColorSetter = (props:ColorListProps) =>{
    const theme = useTheme()

    return(
        <Box width={'50%'}>

            {props.colors.map((color) =>(
                color.value != 'default' && (
                        <ColorSetterRow key={color.id} color={color.value} title={color.title} id={color.id} data={props.data} setData={props.setData}/>
                    )
            ))}

        </Box>
    )
}

export default ColorSetter