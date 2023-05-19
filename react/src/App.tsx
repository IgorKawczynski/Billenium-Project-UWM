import React, {Suspense, useEffect, useMemo} from 'react'
import Board from "./pages/board/board"
import Home from "./pages/home/home";
import {Route, Routes} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {darkOptions, lightOptions} from './assets/themes/BasicTheme'
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
    useEffect(() => {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) {
            setMode(savedMode as 'light' | 'dark');
        }
    }, []);

    const colorMode = useMemo(
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
        <Suspense fallback={'Loading..'}>
            <ColorModeContext.Provider value={colorMode} >
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<SnackbarProvider maxSnack={1}><Home/></SnackbarProvider>}/>
                        <Route path="/userMain/:userId" element={<SnackbarProvider maxSnack={3}><UserMain/> </SnackbarProvider>}/>
                        <Route path="/board/:boardId" element={<SnackbarProvider maxSnack={3}> <Board/> </SnackbarProvider>}/>
                    </Routes>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Suspense>
    )
}

export default KabanTable
