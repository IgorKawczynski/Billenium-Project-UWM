import React from "react";
import {Box, Button, Typography, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddColumnButton from "@/componenets/column/addColumnButton/addColumnButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import {boardHeaderProps} from "@/componenets/board/interfaces/boardHeaderInterface/BoardHeader";
import CardColor from "@/assets/themes/colors";
import ColorLegend from "@/componenets/color/colorLegend/colorLegend";


const BoardHeader = (props:boardHeaderProps) => {
    const theme = useTheme();


    return(
        <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={'250px'}>
                </Box>
                <Typography
                    variant={'h3'}
                    color={'textPrimary'}
                    style={{textAlign:"center"}}
                >
                    {props.data.title}
                    <IconButton
                        aria-label="settingsColumn"
                        onClick={() => openModal(props.setModalEdit)}
                    >
                        <BorderColorOutlinedIcon/>
                    </IconButton>
                </Typography>
                <Box sx={{textAlign:'center'}} width={'250px'}>
                    <Typography
                        color={'textPrimary'}
                        variant={'h4'}
                    >
                        Kanban Board
                    </Typography>
                    <Typography
                        color={theme.palette.primary.main}
                        variant={'h5'}
                    >
                        by MAGI
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                width:'100%'
            }}>
                <AddColumnButton
                    data={props.data}
                    setData={props.setData}

                />
                <ColorLegend colors={props.data.colorList} data={props.data} setData={props.setData}/>
            </Box>
        </Box>
    )
}
export default BoardHeader