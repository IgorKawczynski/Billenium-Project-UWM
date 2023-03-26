import React, {useState} from "react";
import {Box, useTheme, Stack, Tooltip, Badge} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import {UserMenuProps} from "@/componenets/menus/interfaces/userMenu";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MarkunreadIcon from '@mui/icons-material/Markunread';

const UserMenu = (props:UserMenuProps) => {
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
                zIndex={10}
            >
                <Stack
                    minHeight={'85vh'}
                    spacing={2}
                >
                    <Tooltip title={"Edit Profile"} placement={"left"}>
                        <IconButton
                            sx={{color:theme.palette.text.theme}}
                            size={"large"}
                            onClick={() => openModal(props.setModalEdit)}
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Add board"} placement={"left"}>
                        <IconButton
                            sx={{color:theme.palette.text.theme}}
                            size={"large"}
                            onClick={() => openModal(props.setModalAddBoard)}
                        >
                            <DashboardCustomizeIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Your invitations"} placement={"left"}>
                        <IconButton
                            sx={{color:theme.palette.text.theme}}
                            size={"large"}
                        >
                            <Badge badgeContent={3} color={"info"}>
                                <MarkunreadIcon/>
                            </Badge>
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

export default UserMenu