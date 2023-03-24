import React from "react";
import {Box, useTheme, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {ColorModeContext} from "@/App";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";


const BoardMenu = () => {
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
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <GroupIcon/>
                    </IconButton>
                </Stack>

                <Stack
                    spacing={2}
                    minHeight={'15vh'}
                >
                    <IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <Brightness4Icon/>
                    </IconButton>

                    <Link to={'/'}><IconButton
                        sx={{color:theme.palette.text.theme}}
                        onClick={colorMode.toggleColorMode}
                        size={"large"}
                    >
                        <LogoutIcon/>
                    </IconButton>
                    </Link>
                </Stack>
            </Box>
            </Box>
    )

}

export default BoardMenu