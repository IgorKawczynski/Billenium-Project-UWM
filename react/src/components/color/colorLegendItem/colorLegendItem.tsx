import React from "react";
import {Box, Typography, useTheme} from "@mui/material";
import {ColorProps} from "@/components/color/interfaces/colorInterface/Color";

const ColorLegendItem = (props:ColorProps) => {
    const theme = useTheme()

    return(
        <Box
            display={"flex"}
            marginRight={1}
        >
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
    )
}
export default ColorLegendItem