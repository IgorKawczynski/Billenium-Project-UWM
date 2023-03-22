import React from "react";
import {Box, Button, Typography, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddColumnButton from "@/componenets/addColumnButton/addColumnButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import {boardHeaderProps} from "@/interfaces/boardHeaderInterface/BoardHeader";
import CardColor from "@/assets/themes/colors";
import ColorLegend from "@/componenets/colorLegend/colorLegend";


const BoardHeader = (props:boardHeaderProps) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);


    return(
        <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={'250px'}>
                    <Button onClick={colorMode.toggleColorMode}>

                        {theme.palette.mode == 'light'
                            && (<Typography sx={{display:'flex',
                                justifyContent:'center',
                                alignItems:"center"
                            }}
                            >

                                Dark Mode

                                <Brightness4Icon/>
                            </Typography>)}

                        {!(theme.palette.mode == 'light')
                            && (<Typography sx={{display:'flex',
                                justifyContent:'center',
                                alignItems:"center"
                            }}
                            >

                                Light Mode

                                <Brightness4Icon/>
                            </Typography>)}
                    </Button>
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