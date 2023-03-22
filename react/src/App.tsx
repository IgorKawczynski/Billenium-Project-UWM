import React from 'react'
import Board from "./pages/board/board"
import Home from "./pages/home/home";
import {Route, Routes} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {darkOptions, lightOptions} from './assets/themes/BasicTheme'
import {SnackbarProvider} from 'notistack'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const customThemes = {
    light: createTheme(lightOptions),
    dark: createTheme(darkOptions),
};

function KabanTable() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => customThemes[mode],
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/board" element={<SnackbarProvider maxSnack={3}> <Board/> </SnackbarProvider>}/>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default KabanTable
