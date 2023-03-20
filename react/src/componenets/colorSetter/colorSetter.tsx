import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {useTheme} from "@mui/material";
import CardColor from "@/assets/themes/colors";
import ColorSetterRow from "@/componenets/colorSetterRow/colorSetterRow";

const ColorSetter = () =>{
    const theme = useTheme()

    return(
        <Box width={'50%'}>

            <ColorSetterRow color={CardColor.purple} title={"Card 1"}/>
            <ColorSetterRow color={CardColor.blue} title={"Card 2"}/>
            <ColorSetterRow color={CardColor.green} title={"Card 3"}/>
            <ColorSetterRow color={CardColor.yellow} title={"Card 4"}/>
            <ColorSetterRow color={CardColor.red} title={"Card 5"}/>

        </Box>
    )
}

export default ColorSetter