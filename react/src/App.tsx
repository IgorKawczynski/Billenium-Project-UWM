import React, {useEffect, useMemo} from 'react'
import Board from "./pages/board/board"
import Home from "./pages/home/home";
import {Route, Routes} from "react-router-dom";
import {createTheme, makeStyles, ThemeOptions, ThemeProvider, useTheme} from '@mui/material/styles';
import {lightOptions, darkOptions} from './assets/themes/BasicTheme'
import {SnackbarProvider, useSnackbar} from 'notistack'
import UserMain from "@/pages/userMain/userMain";
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const customThemes = {
    light: createTheme(lightOptions),
    dark: createTheme(darkOptions),
};

function KabanTable() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) {
            setMode(savedMode as 'light' | 'dark');
        }
    }, []);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    React.useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const theme = React.useMemo(
        () => customThemes[mode],
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/userMain" element={<SnackbarProvider maxSnack={3}><UserMain/> </SnackbarProvider>}/>
                    <Route path="/board/:id" element={<SnackbarProvider maxSnack={3}> <Board/> </SnackbarProvider>}/>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default KabanTable
