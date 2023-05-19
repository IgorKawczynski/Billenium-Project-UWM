import React from "react";
import {Box, Stack, Tooltip, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {Link} from "react-router-dom";
import {BoardMenuProps} from "@/components/menus/interfaces/boardMenu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {logoutUser} from "@/services/utils/loginUtils/loginUtils";
import LanguageSwitcher from "@/components/languageSwitcher/languageSwitcher";
import {useTranslation} from "react-i18next";

const BoardMenu = (props:BoardMenuProps) => {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext);
    const userId = sessionStorage.getItem('userId')
    const { t } = useTranslation();
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
                    minHeight={'80vh'}
                    spacing={2}
                >
                    <Link to={`/userMain/${userId}`}>
                        <Tooltip title={t('yourBoards')} placement={'left'}>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        size={"large"}
                    >
                        <DashboardIcon/>
                    </IconButton>
                    </Tooltip>
                    </Link>
                    <Tooltip title={t('usersManagement')} placement={"left"}>
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
                    minHeight={'20vh'}
                >
                    <LanguageSwitcher/>
                    <Tooltip title={t('themeMode')} placement={"left"}>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <Brightness4Icon/>
                    </IconButton>
                </Tooltip>
                    <Tooltip title={t('logout')} placement={"left"}>
                    <Link to={'/'}><IconButton
                        sx={{color:theme.palette.text.theme}}
                        size={"large"}
                        onClick={() => logoutUser()}
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