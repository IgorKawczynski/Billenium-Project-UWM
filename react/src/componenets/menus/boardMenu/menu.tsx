import React from "react";
import {Box, useTheme, Stack, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {Link} from "react-router-dom";
import {BoardMenuProps} from "@/componenets/menus/interfaces/boardMenu";
import DashboardIcon from '@mui/icons-material/Dashboard';

const BoardMenu = (props:BoardMenuProps) => {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext);
    return(
        <Box
            minWidth={'64px'}
            minHeight={'90%'}
        >
            <Box
                width={'48px'}
                minHeight={'50%'}
                position={"fixed"}
                padding={1}
                bgcolor={theme.palette.primary.main}
                display={"flex"}
                flexDirection={'column'}
                justifyContent={"end"}
                zIndex={2}
            >
                <Stack
                    minHeight={'85vh'}
                    spacing={2}
                >
                    <Link to={'/userMain'}>
                        <Tooltip title={"Your Boards"} placement={'left'}>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        size={"large"}
                    >
                        <DashboardIcon/>
                    </IconButton>
                    </Tooltip>
                    </Link>
                    <Tooltip title={"Users Management"} placement={"left"}>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        size={"large"}
                        onClick={() => openModal(props.setUsers)}
                    >
                        <GroupIcon/>
                    </IconButton>
                </Tooltip>
                </Stack>

                <Stack
                    spacing={2}
                    minHeight={'15vh'}
                >
                    <Tooltip title={"Theme mode"} placement={"left"}>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <Brightness4Icon/>
                    </IconButton>
                </Tooltip>
                    <Tooltip title={"Logout"} placement={"left"}>
                    <Link to={'/'}><IconButton
                        sx={{color:theme.palette.text.theme}}
                        size={"large"}
                    >
                        <LogoutIcon/>
                    </IconButton>
                    </Link>
                    </Tooltip>
                </Stack>
            </Box>
            </Box>
    )

}

export default BoardMenu