import React from "react";
import {Box, Button, Typography, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddColumnButton from "@/componenets/addColumnButton/addColumnButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import {boardHeaderProps} from "@/interfaces/boardHeaderInterface/BoardHeader";


const BoardHeader = (props:boardHeaderProps) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);


    return(
        <Box sx={{
            display:'flex',
            justifyContent:'space-between',
            width:'100%'}}>
            <Box sx={{width:'200px'}}
            >

            </Box>
            <Box>
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
                    </IconButton></Typography>
                <AddColumnButton
                    data={props.data}
                    setData={props.setData}
                />
            </Box>
            <Box>
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
                <Box sx={{textAlign:'center'}}>
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
        </Box>
    )
}
export default BoardHeader